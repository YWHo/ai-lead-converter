import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
import { uploadThingFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<uploadThingFileRouter>();
export const UploadDropzone = generateUploadDropzone<uploadThingFileRouter>();
