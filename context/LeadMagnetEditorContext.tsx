import { createContext, ReactNode, useContext, useState } from "react";
import { LeadMagnet } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface LeadMagnetEditorContextState {
  editedLeadMagnet: LeadMagnet;
  setEditedLeadMagnet: Dispatch<SetStateAction<LeadMagnet>>;
  save: () => Promise<void>;
  publish: () => Promise<void>;
  unpublish: () => Promise<void>;
  remove: () => Promise<void>;
}

const LeadMagnetEditorContext =
  createContext<LeadMagnetEditorContextState | null>(null);

export const LeadMagnetEditorContextProvider = ({
  children,
  leadMagnet,
}: {
  children: ReactNode;
  leadMagnet: LeadMagnet;
}) => {
  const { session } = useSession();
  const { replace, push } = useRouter();
  const [editedLeadMagnet, setEditedLeadMagnet] =
    useState<LeadMagnet>(leadMagnet);

  if (!session) {
    throw new Error("No session found");
  }

  const save = async () => {
    try {
      const response = await axios.request({
        url: "/api/lead-magnet",
        method: editedLeadMagnet.id ? "PUT" : "POST",
        data: {
          ...editedLeadMagnet,
          userId: session.user.id,
        },
      });

      if (response.data.data) {
        toast.success("Lead Magnet saved successfully");
      }
    } catch (err) {
      toast.error("Failed to save Lead Magnet");
    }
  };

  const publish = async () => {
    try {
      const response = await axios.post("/api/lead-magnet/publish", {
        id: editedLeadMagnet.id,
      });
      if (response.data.data) {
        toast.success("Lead Magnet published successfully");
      }
    } catch (err) {
      toast.error("Failed to publish Lead Magnet");
    }
  };

  const unpublish = async () => {
    try {
      const response = await axios.post("/api/lead-magnet/unpublish", {
        id: editedLeadMagnet.id,
      });
      if (response.data.data) {
        toast.success("Lead Magnet unpublished successfully");
      }
    } catch (err) {
      toast.error("Failed to unpublish Lead Magnet");
    }
  };

  const remove = async () => {
    try {
      const response = await axios.delete(
        `/api/lead-magnet?id=${editedLeadMagnet.id}`
      );
      if (response.data.success) {
        toast.success("Lead Magnet deleted successfully");
      }
    } catch (err) {
      toast.error("Failed to delete Lead Magnet");
    }
  };

  return (
    <LeadMagnetEditorContext.Provider
      value={{
        save,
        editedLeadMagnet,
        setEditedLeadMagnet,
        publish,
        unpublish,
        remove,
      }}
    >
      {children}
    </LeadMagnetEditorContext.Provider>
  );
};

export function useLeadMagnetEditorContext() {
  const context = useContext(LeadMagnetEditorContext);
  if (!context) {
    throw new Error(
      "useLeadMagnetEditorContext must be used within a LeadMagnetEditorProvider"
    );
  }

  return context;
}
