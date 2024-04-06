"use client";
import React, { useState } from "react";
import { useLeadMagnetEditorContext } from "@/context/LeadMagnetEditorContext";
import { BsArrowLeft, BsCheck, BsPencil } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useProfileEditorContext } from "@/context/ProfileEditorContext";

interface LeadMagnetEditorNavbarProps {}

function LeadMagnetEditorNavbar({}: LeadMagnetEditorNavbarProps) {
  const router = useRouter();

  const {
    editedLeadMagnet,
    publish,
    remove,
    save: saveLeadMagnet,
    setEditedLeadMagnet,
    unpublish,
  } = useLeadMagnetEditorContext();

  const { save: saveProfile, account } = useProfileEditorContext();

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [unpublishing, setUnpublishing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // console.log("LeadMagnetEditorNavbar editedLeadMagnet:\n", editedLeadMagnet);

  const saveName = async () => {
    try {
      await saveLeadMagnet();
      toast.success("Saved!");
      setEditing(false);
    } catch (err) {
      console.log("saveName err:\n", err);
      toast.error("Error saving name!");
    }
  };

  const cancelSaveName = () => {
    setEditing(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveLeadMagnet();
      await saveProfile();
      toast.success("Saved!");
    } catch (err) {
      console.log("handleSave error:\n", err);
      toast.error("Error saving. Please try again");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    setPublishing(true);
    try {
      await publish();
      toast.success("Published!");
    } catch (err) {
      console.log("handlePublish error:\n", err);
      toast.error("Error publishing. Please try again.");
    } finally {
      setPublishing(false);
    }
  };

  const handleUnpublish = async () => {
    setUnpublishing(true);
    try {
      await unpublish();
      toast.success("Unpublished!");
    } catch (err) {
      console.log("handleUnpublish error:\n", err);
      toast.error("Error unpublishing. Please try again.");
    } finally {
      setUnpublishing(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await remove();
      toast.success("Deleted!");
      router.push("/lead-magnets");
      router.refresh();
    } catch (err) {
      console.log("handleDelete error:\n", err);
      toast.error("Error deleting. Please try again.");
    } finally {
      setDeleting(false);
    }
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
        {/* Delete with state */}
        {editedLeadMagnet.id && (
          <Button variant="destructive" onClick={handleDelete}>
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        )}
        {/* Unpublish and View Final LM */}
        {editedLeadMagnet.status === "published" && (
          <>
            <Button variant="outline" onClick={handleUnpublish}>
              {unpublishing ? "Unpublishing..." : "Unpublish"}
            </Button>
            {account && (
              <Link href={`/lm/${account?.username}/${editedLeadMagnet.slug}`}>
                <Button variant="outline">View Published</Button>
              </Link>
            )}
          </>
        )}
        {/* Save & Publish with state */}
        <Button variant="outline" onClick={handleSave} disabled={saving}>
          {publishing ? "Saving..." : "Save"}
        </Button>
        <Button onClick={handlePublish} disabled={publishing}>
          {publishing ? "Publishing..." : "Publish"}
        </Button>
      </div>
    </div>
  );
}

export default LeadMagnetEditorNavbar;
