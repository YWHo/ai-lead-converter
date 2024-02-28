"use client";
import React from "react";
import { LeadMagnet } from "@prisma/client";
import { LeadMagnetEditorContextProvider } from "@/context/LeadMagnetEditorContext";
import LeadMagnetEditor from "./LeadMagnetEditor";

interface LeadMagnetEditorContainerProps {
  leadMagnet: LeadMagnet;
}

function LeadMagnetEditorContainer({
  leadMagnet,
}: LeadMagnetEditorContainerProps) {
  return (
    <LeadMagnetEditorContextProvider leadMagnet={leadMagnet}>
      <LeadMagnetEditor />
    </LeadMagnetEditorContextProvider>
  );
}

export default LeadMagnetEditorContainer;
