// Reference: https://docs.uploadthing.com/getting-started/appdir

import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const uploadThingFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      const user = await currentUser();

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const profile = await prismadb.profile.findUnique({
        where: { userId: metadata.userId },
      });

      if (!profile) throw new Error("No profile found");

      prismadb.profile.update({
        where: { userId: metadata.userId },
        data: { ...profile, profileImageUrl: file.url },
      });

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: `${metadata.firstName} ${metadata.lastName}` };
    }),
} satisfies FileRouter;

export type uploadThingFileRouter = typeof uploadThingFileRouter;
