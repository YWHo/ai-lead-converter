import { useLeadMagnetEditorContext } from "@/context/LeadMagnetEditorContext";
import { slugifyLeadMagnet } from "@/lib/utils";
import React from "react";

type Props = {};

function LeadMagnetSettings({}: Props) {
  const { editedLeadMagnet, setEditedLeadMagnet } =
    useLeadMagnetEditorContext();

  return (
    <div className='flex h-full flex-row w-full'>
      <div className="m-8 flex w-full h-full flex-col">
        <h1 className="mb-4 text-3xl font-bold text-purple-500">
          Lead Magnet Settings
        </h1>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700 shadow focus:outline-none">
            Slug
          </label>
          <input
            value={
              editedLeadMagnet.slug ??
              slugifyLeadMagnet(editedLeadMagnet.draftTitle)
            }
            onChange={e => {
              const newSlug = slugifyLeadMagnet(e.target.value);
              setEditedLeadMagnet(prev => ({
                ...prev,
                slug: newSlug
              }))
            }}
            placeholder="What is the title of your lead magnet?"
          />
          <p className="mt-2 text-sm text-gray-500">
            Slug can only contain numbers, letters, and -
          </p>
        </div>
      </div>
    </div>
    );
}

export default LeadMagnetSettings;
