import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { leadMagnetCreateRequest, leadMagnetUpdateRequest } from "./schema";
import { prismadb } from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    // Grab our authentication state from clerk
    const user = await currentUser();

    if (!user?.id) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    const userId = user.id;

    // Parse & validate the data the user sent us
    const requestData = await request.json();
    const parsed = leadMagnetCreateRequest.safeParse(requestData);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.message },
        { status: 400 }
      );
    }

    const newLead = parsed.data;

    // Create a new lead-magnet in our database with Prisma
    const newLeadMagnet = await prismadb.leadMagnet.create({
      data: { ...newLead, userId },
    });

    // Return the new lead magnet to the user
    return NextResponse.json(
      {
        message: "Successfully created Lead Magnet",
        data: newLeadMagnet,
        success: true,
      },
      { status: 201 }
    );
  } catch (err) {
    console.log("POST /api/lead-magnet err:\n", err);
    return NextResponse.json(
      {
        message: "Failed to add a new Lead Magnet",
        data: null,
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    // Grab our authentication state from clerk
    const user = await currentUser();

    if (!user?.id) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    const userId = user.id;

    // Parse & validate the data the user sent us
    const requestData = await request.json();
    const parsed = leadMagnetUpdateRequest.safeParse(requestData);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.message },
        { status: 400 }
      );
    }

    const leadMagnetToUpdate = parsed.data;
    if (leadMagnetToUpdate.userId !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    // Create a new lead-magnet in our database with Prisma
    const updatedLeadMagnet = await prismadb.leadMagnet.update({
      where: { id: leadMagnetToUpdate.id },
      data: { ...leadMagnetToUpdate },
    });

    // Return the new lead magnet to the user
    return NextResponse.json(
      {
        message: "Successfully updated Lead Magnet",
        data: updatedLeadMagnet,
        success: true,
      },
      { status: 201 }
    );
  } catch (err) {
    console.log("PUT /api/lead-magnet err:\n", err);
    return NextResponse.json(
      {
        message: "Failed to update the Lead Magnet",
        data: null,
        success: false,
      },
      { status: 500 }
    );
  }
}
