import { prismadb } from "@/lib/prismadb";
import { slugifyLeadMagnet } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { z } from "zod";

const leadMagnetPublishRequest = z.object({
  id: z.string({ required_error: "Id is required" }),
});

export async function POST(request: Request) {
  // Grab our authentication state from clerk
  const user = await currentUser();

  if (!user?.id) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  const userId = user.id;

  const requestBody = await request.json();
  const parsedPublishedRequest =
    leadMagnetPublishRequest.safeParse(requestBody);

  if (!parsedPublishedRequest.success) {
    return NextResponse.json(
      { message: parsedPublishedRequest.error },
      { status: 400 }
    );
  }

  const pubishRequest = parsedPublishedRequest.data;

  const leadMagnet = await prismadb.leadMagnet.findUnique({
    where: {
      id: pubishRequest.id,
    },
  });

  if (!leadMagnet) {
    return NextResponse.json(
      { message: "Lead magnet not found" },
      { status: 404 }
    );
  }

  const publishedLeadMagnet = await prismadb.leadMagnet.update({
    where: {
      id: pubishRequest.id,
    },
    data: {
      ...leadMagnet,
      publishedBody: leadMagnet.draftBody,
      publishedPrompt: leadMagnet.draftPrompt,
      publishedTitle: leadMagnet.draftTitle,
      publishedSubtitle: leadMagnet.draftSubtitle,
      publishedFirstQuestion: leadMagnet.draftFirstQuestion,
      publishedEmailCapture: leadMagnet.draftEmailCapture,
      updatedAt: new Date(),
      status: "published",
      publishedAt: new Date(),
      slug: leadMagnet.slug ?? slugifyLeadMagnet(leadMagnet.draftTitle),
    },
  });

  return NextResponse.json({
    message: "Successfully published lead magnet!",
    data: publishedLeadMagnet,
    success: true,
  });
}
