"use client";
import React from "react";
import { useLeadMagnetEditorContext } from "@/context/LeadMagnetEditorContext";

interface LeadMagnetEditorNavbarProps {}

function LeadMagnetEditorNavbar({}: LeadMagnetEditorNavbarProps) {
  const { editedLeadMagnet } = useLeadMagnetEditorContext();

  console.log("LeadMagnetEditorNavbar editedLeadMagnet:\n", editedLeadMagnet);
  return <div>LeadMagnetEditorNavbar</div>;
}

export default LeadMagnetEditorNavbar;
