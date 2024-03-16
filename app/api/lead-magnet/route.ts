import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { leadMagnetCreateRequest, leadMagnetUpdateRequest } from "./schema";
import { prismadb } from "@/lib/prismadb";
import { z } from "zod";

export const POST = (request: Request) =>
  handleRequest(request, leadMagnetCreateRequest);
export const PUT = (request: Request) =>
  handleRequest(request, leadMagnetUpdateRequest, true);

async function handleRequest(
  request: Request,
  schema: z.ZodType<any, any>,
  isUpdate = false
) {
  try {
    // Grab our authentication state from clerk
    const user = await currentUser();

    if (!user?.id) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    const userId = user.id;

    // Parse & validate the data the user sent us
    const requestData = await request.json();

    const parsed = schema.safeParse(requestData);
    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.message },
        { status: 400 }
      );
    }

    if (isUpdate && parsed.data.userId !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const data = {
      ...parsed.data,
      userId: userId,
    };

    // Create a new lead-magnet in our database with Prisma
    const updatedLeadMagnet = isUpdate
      ? await prismadb.leadMagnet.update({
          where: { id: data.id },
          data,
        })
      : await prismadb.leadMagnet.create({
          data,
        });

    // Return the new lead magnet to the user
    return NextResponse.json(
      {
        message: isUpdate
          ? "Successfully updated Lead Magnet"
          : "Successfully created Lead Magnet",
        data: updatedLeadMagnet,
        success: true,
      },
      { status: isUpdate ? 200 : 201 }
    );
  } catch (err) {
    console.log("handleRequest err:\n", err);
    return NextResponse.json(
      {
        message: "Failed to handle request for the Lead Magnet",
        data: null,
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "No id provided", success: false },
      { status: 400 }
    );
  }

  // Grab our authentication state from clerk
  const user = await currentUser();

  if (!user?.id) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  const userId = user.id;
  const leadMagnet = await prismadb.leadMagnet.findFirst({
    where: { id },
  });

  if (!leadMagnet) {
    return NextResponse.json(
      { message: "Lead magnet not found", success: false },
      { status: 404 }
    );
  }

  if (leadMagnet.userId !== user?.id) {
    return NextResponse.json(
      { message: "Unauthorized", success: false },
      { status: 403 }
    );
  }

  await prismadb.leadMagnet.delete({ where: { id } });
  return NextResponse.json(
    {
      message: "Successfully deleted lead magnet",
      success: true,
    },
    { status: 202 }
  );
}
