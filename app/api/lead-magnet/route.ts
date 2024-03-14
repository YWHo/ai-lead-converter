import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { leadMagnetCreateRequest } from "./schema";
import { prismadb } from "@/lib/prismadb";

export async function POST(request: Request) {
  // TODO: Grab our authentication state from clerk
  const user = await currentUser();

  console.log("\n\n\n ---- POST /api/lead-magnet: user:\n", user);

  if (!user?.id) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  const userId = user.id; // testing

  // TODO: Parse & validate the data the user sent us
  const requestData = await request.json();
  console.log("\n\n\n ---- POST /api/lead-magnet: requestData:\n", requestData);
  const parsed = leadMagnetCreateRequest.safeParse(requestData);

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.message },
      { status: 400 }
    );
  }

  console.log("\n\n\n ---- POST /api/lead-magnet: parsed success.....\n");

  try {
    const newLead = parsed.data;
    console.log("\n\n\n ----POST /api/lead-magnet: userId:\n", userId);
    console.log("\n\n\n ----POST /api/lead-magnet: newLead:\n", newLead);

    // Create a new lead-magnet in our database with Prisma
    const newLeadMagnet = await prismadb.leadMagnet.create({
      data: { ...newLead, userId },
    });

    // Return the new lead magnet to the user
    return NextResponse.json(
      {
        message: "Sucessfully created Lead Magnet",
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
