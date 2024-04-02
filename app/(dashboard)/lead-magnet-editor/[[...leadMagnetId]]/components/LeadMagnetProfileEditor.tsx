import { useProfileEditorContext } from "@/context/ProfileEditorContext";
import React from "react";

type Props = {};

function LeadMagnetProfileEditor({}: Props) {
  const { editedProfile, setEditedProfile } = useProfileEditorContext();

  return (
    <div className="flex h-full flex-row border-gray-200">
      <div className="m-8 flex w-1/2 flex-col">
        <h1 className="mb-4 text-3xl font-bold text-purple-500">
          Profile Editor
        </h1>
        {/* TODO: Upload thing */}
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
