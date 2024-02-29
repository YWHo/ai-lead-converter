"use client";
import React, { useState } from "react";
import { useLeadMagnetEditorContext } from "@/context/LeadMagnetEditorContext";
import { BsArrowLeft, BsCheck, BsPencil } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

interface LeadMagnetEditorNavbarProps {}

function LeadMagnetEditorNavbar({}: LeadMagnetEditorNavbarProps) {
  const router = useRouter();
  const { editedLeadMagnet, save, setEditedLeadMagnet } =
    useLeadMagnetEditorContext();
  const [editing, setEditing] = useState(false);

  console.log("LeadMagnetEditorNavbar editedLeadMagnet:\n", editedLeadMagnet);

  const saveName = async () => {
    try {
      await save();
      toast.success("Saved!");
    } catch (err) {
      console.log("saveName err:\n", err);
      toast.error("Error saving name!");
    }
  };
  const cancelSaveName = () => {
    setEditing(false);
  };

  return (
    <div className="flex w-full flex-row items-center justify-between border-b-[1px] border-solid border-gray-200 bg-white p-3 text-gray-600 ">
      <div className="flex flex-row items-center">
        {/* Go Back */}
        <BsArrowLeft
          size={20}
          className="pr-3 w-fit cursor-pointer"
          onClick={() => router.push("/lead-magnets")}
        />
        {/* Input */}
        {editing ? (
          <Input
            value={editedLeadMagnet.name}
            onChange={(e) =>
              setEditedLeadMagnet((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        ) : (
          <span className="text-xl font-bold">{editedLeadMagnet.name}</span>
        )}
        {/* Edit / Save */}
        {editing ? (
          <div className="flex flex-row text-purple-500">
            <BsCheck className="cursor-pointer" size={25} onClick={saveName} />
            <span className="border-r-2 mx-1 border-r-gray-300" />
            <span
              className="ml-[5px] cursor-pointer font-normal"
              onClick={cancelSaveName}
            >
              X
            </span>
          </div>
        ) : (
          <div
            className="ml-3 cursor-pointer"
            onClick={() => setEditing((prev) => !prev)}
          >
            <BsPencil />
          </div>
        )}
      </div>
      <div className="flex flex-row items-center gap-x-4">
        {/* TODO: Delete with state */}
        {/* TODO: Unpublish and View Final LM */}
        {/* TODO: Save & Publish with state */}
      </div>
    </div>
  );
}

export default LeadMagnetEditorNavbar;
