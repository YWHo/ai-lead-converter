import React from "react";

type Props = {};

function LeadMagnetContentEditor({}: Props) {
  return (
    <div className="flex h-full flex-row">
      <div className="m-8 flex w-1/2 flex-col">
        <h1 className="mb-4 text-3xl font-bold text-purple-500">
          Content Editor
        </h1>
      </div>
      <div className="purple-dotted-pattern flex h-full w-1/2 flex-col overflow-y-auto">
        <h1>Content Preview</h1>
      </div>
    </div>
  );
}

export default LeadMagnetContentEditor;
