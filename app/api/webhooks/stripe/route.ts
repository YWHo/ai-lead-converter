import { prismadb } from "@/lib/prismadb";
import { stripe } from "@/utils/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    if (!endpointSecret) {
      throw new Error("Stripe webhook secret not set");
    }
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err) {
    console.error(`⚠️  Webhook signature verification failed.`, err);
    return NextResponse.json(
      { message: "Could not access Stripe" },
      { status: 400 }
    );
  }

  try {
    const session = event.data.object as Stripe.Checkout.Session;
    const subscriptionFromStripe = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    if (event.type === "checkout.session.completed") {
      if (!session?.metadata?.userId) {
        return new NextResponse("User id is required", { status: 400 });
      }

      await prismadb.subscription.create({
        data: {
          userId: session?.metadata?.userId,
          stripeSubscriptionId: subscriptionFromStripe.id,
          stripeCustomerId: subscriptionFromStripe.customer as string,
          stripeCurrentPeriodEnd: new Date(
            subscriptionFromStripe.current_period_end * 1000
          ),
        },
      });
    }

    if (event.type === "invoice.payment_succeeded") {
      const tmpSubscriptonId = subscriptionFromStripe.id ?? "invalid_id";
      const subscriptionFromDB = await prismadb.subscription.findFirst({
        where: {
          stripeSubscriptionId: tmpSubscriptonId,
        },
      });
      if (!subscriptionFromDB) {
        return new NextResponse("Subscription not found", { status: 404 });
      }

      await prismadb.subscription.update({
        where: {
          stripeSubscriptionId: subscriptionFromStripe.id,
        },
        data: {
          stripeCurrentPeriodEnd: new Date(
            subscriptionFromStripe.current_period_end * 1000
          ),
        },
      });
    } else if (event.type === "customer.subscription.deleted") {
      // Nothing to do; let the existing subscription continue until expired
    } else if (event.type === "charge.refunded") {
      // Handle the refund situation
      // Note: Auto terminating the subscription on refund will wrongly stop
      // a valid subscription if a refund was due to overcharged
    }

    return new NextResponse(null, { status: 200 });
  } catch (err) {
    console.error(
      `[STRIPE ERROR] Unexpected issue when handling events:\n`,
      err
    );
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}

async function getSubscriptionFromDB(stripeSubscriptionId: string) {
  const subscriptionFromDB = await prismadb.subscription.findFirst({
    where: {
      stripeSubscriptionId: stripeSubscriptionId ?? "any_invalid_id",
    },
  });

  return subscriptionFromDB;
}
