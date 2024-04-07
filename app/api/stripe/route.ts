import { prismadb } from "@/lib/prismadb";
import { stripe } from "@/utils/stripe";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }
    const userSubsription = await prismadb.subscription.findUnique({
      where: { userId },
    });

    if (userSubsription && userSubsription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubsription.stripeCustomerId,
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/account `,
      });

      return NextResponse.json({ url: stripeSession.url }, { status: 200 });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/account`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/account`,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "AI Lead Magnet Pro",
              description: "Unlimited AI Lead Magnets",
            },
            unit_amount: 1000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: { userId },
    });

    return NextResponse.json({ url: stripeSession.url }, { status: 200 });
  } catch (err) {
    console.error("[STRIPE ERROR] ", err);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
