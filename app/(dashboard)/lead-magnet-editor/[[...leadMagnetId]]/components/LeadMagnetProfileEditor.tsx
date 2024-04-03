"use client";

import { useProfileEditorContext } from "@/context/ProfileEditorContext";
import { UploadButton } from "@/utils/uploadthing";
import "@uploadthing/react/styles.css";
import React from "react";
import toast from "react-hot-toast";

function LeadMagnetProfileEditor() {
  const { editedProfile, setEditedProfile } = useProfileEditorContext();

  return (
    <div className="flex h-full flex-row border-gray-200">
      <div className="m-8 flex w-1/2 flex-col">
        <h1 className="mb-4 text-3xl font-bold text-purple-500">
          Profile Editor
        </h1>
        <div className="mb-4">
          <UploadButton
            appearance={{
              button:
                "bg-purple-500 focus-within:ring-purple-500 after:bg-purple-500",
            }}
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("LeadMagnetProfileEditor Files: ", res);
              if (res && (res?.length ?? 0) > 0) {
                toast.success("Upload Completed");
                const file = res[0];
                file &&
                  setEditedProfile((prev) => ({
                    ...prev,
                    profileImageUrl: file.url,
                  }));
              }
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              console.log("upload error:\n", error);
              toast.error(`ERROR! ${error.message}`);
            }}
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Title
          </label>
          <input
            type="text"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2"
            value={editedProfile.title}
            onChange={(e) => {
              setEditedProfile((prev) => ({
                ...prev,
                title: e.target.value,
              }));
            }}
            placeholder="Your name here..."
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Welcome Message
          </label>
          <textarea
            className="w-full appearance-none rounded border px-3 py-2 leading-3"
            value={editedProfile.description ?? ""}
            placeholder="Type in your welcome message here"
            rows={5}
            onChange={(e) => {
              setEditedProfile((prev) => ({
                ...prev,
                description: e.target.value,
              }));
            }}
          />
        </div>
      </div>
      <div className="purple-dotted-pattern flex w-1/2 flex-col"></div>
    </div>
  );
}

export default LeadMagnetProfileEditor;
