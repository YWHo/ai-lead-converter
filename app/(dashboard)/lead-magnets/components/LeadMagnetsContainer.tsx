"use client";

import React from "react";
import { Lead, LeadMagnet } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface LeadMagnetsContainerProps {
  leadMagnets: LeadMagnet[];
  leads: Lead[];
}

function LeadMagnetsContainer({
  leadMagnets,
  leads,
}: LeadMagnetsContainerProps) {
  console.log("leadMagnets from inside the client:\n", leadMagnets);
  console.log("leads from inside the client:\n", leads);
  return (
    <div className="p-6 w-full lg:max-w-5xl lg:mx-auto">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Lead Magnets</h2>
        <Button>
          <Link href="/lead-magnet-editor">Create</Link>
        </Button>
      </div>
    </div>
  );
}

export default LeadMagnetsContainer;
