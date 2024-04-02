import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { profileCreateRequest, profileUpdateRequest } from "./profile.schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required", data: null },
      { status: 400 }
    );
  }

  let profile = await prismadb.profile.findFirst({ where: { userId } });
  if (!profile) {
    profile = await prismadb.profile.create({
      data: { userId, description: "", profileImageUrl: "", title: "" },
    });
  }

  return NextResponse.json({ message: "Success", data: profile });
}

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

    // Create a new profile in our database with Prisma
    const updatedProfile = isUpdate
      ? await prismadb.profile.update({
          where: { id: data.id },
          data,
        })
      : await prismadb.profile.create({
          data,
        });

    // Return the new profile to the user
    return NextResponse.json(
      {
        message: isUpdate
          ? "Successfully updated profile"
          : "Successfully created profile",
        data: updatedProfile,
        success: true,
      },
      { status: isUpdate ? 200 : 201 }
    );
  } catch (err) {
    console.log("handleRequest err:\n", err);
    return NextResponse.json(
      {
        message: "Failed to handle request for the profile",
        data: null,
        success: false,
      },
      { status: 500 }
    );
  }
}

export const POST = (request: Request) =>
  handleRequest(request, profileCreateRequest);
export const PUT = (request: Request) =>
  handleRequest(request, profileUpdateRequest, true);
