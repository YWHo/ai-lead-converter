import React, { useState } from "react";

export type LeadMagnetSections =
  | "content"
  | "prompt"
  | "email"
  | "profile"
  | "settings";

interface LeadMagnetEditorProps {}

function LeadMagnetEditor({}: LeadMagnetEditorProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedEditor, setSelectedEditor] =
    useState<LeadMagnetSections>("content");
  return (
    <div className="flex h-screen w-full flex-col overflow-y-hidden">
      LeadMagnetEditorNavBar
      <div className="flex h-full flex-row">LeadMagnetEditorSidebar</div>
      <div className="h-full flex-grow">
        {selectedEditor === "content" && "LeadMagnetContentEditor"}
        {selectedEditor === "prompt" && "LeadMagnetPromptEditor"}
        {selectedEditor === "email" && "LeadMagnetEmailEditor"}
        {selectedEditor === "profile" && "LeadMagnetProfileEditor"}
        {selectedEditor === "settings" && "LeadMagnetSettings"}
      </div>
    </div>
  );
}

export default LeadMagnetEditor;
