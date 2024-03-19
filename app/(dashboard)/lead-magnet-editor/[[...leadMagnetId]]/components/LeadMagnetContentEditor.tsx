import { Input } from "@/components/ui/input";
import { useLeadMagnetEditorContext } from "@/context/LeadMagnetEditorContext";
import React from "react";

function LeadMagnetContentEditor() {
  const { editedLeadMagnet, setEditedLeadMagnet } =
    useLeadMagnetEditorContext();

  return (
    <div className="flex h-full flex-row">
      <div className="m-8 flex w-1/2 flex-col">
        <h1 className="mb-4 text-3xl font-bold text-purple-500">
          Content Editor
        </h1>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Title
          </label>
          <Input
            type="text"
            value={editedLeadMagnet.draftTitle}
            onChange={(e) =>
              setEditedLeadMagnet((prev) => ({
                ...prev,
                draftTitle: e.target.value,
              }))
            }
            placeholder="What is the title of your lead magnet?"
          />
        </div>
        <div className="mb-4">
          <Input
            type="text"
            value={editedLeadMagnet.draftSubtitle}
            onChange={(e) =>
              setEditedLeadMagnet((prev) => ({
                ...prev,
                draftSubtitle: e.target.value,
              }))
            }
            placeholder="What is the title of your lead magnet?"
          />
        </div>
      </div>
      <div className="purple-dotted-pattern flex h-full w-1/2 flex-col overflow-y-auto">
        <h1>Content Preview</h1>
      </div>
    </div>
  );
}

export default LeadMagnetContentEditor;
