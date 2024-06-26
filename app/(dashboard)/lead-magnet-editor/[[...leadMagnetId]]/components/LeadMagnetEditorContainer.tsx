"use client";
import React from "react";
import { LeadMagnet } from "@prisma/client";
import { LeadMagnetEditorContextProvider } from "@/context/LeadMagnetEditorContext";
import LeadMagnetEditor from "./LeadMagnetEditor";
import { useSession } from "@clerk/nextjs";
import LoadingScreen from "@/components/LoadingScreen";
import { ProfileEditorContextProvider } from "@/context/ProfileEditorContext";

interface LeadMagnetEditorContainerProps {
  leadMagnet: LeadMagnet;
}

function LeadMagnetEditorContainer({
  leadMagnet,
}: LeadMagnetEditorContainerProps) {
  const { isLoaded } = useSession();

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return (
    <LeadMagnetEditorContextProvider leadMagnet={leadMagnet}>
      <ProfileEditorContextProvider>
        <LeadMagnetEditor />
      </ProfileEditorContextProvider>
    </LeadMagnetEditorContextProvider>
  );
}

export default LeadMagnetEditorContainer;
