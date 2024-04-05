import LeadMagnetNotFound from "@/components/LeadMagnetNotFound";
import { prismadb } from "@/lib/prismadb";
import React from "react";

interface LeadMagnetProps {
  params: {
    username: string;
    leadMagnetSlug: string;
  };
}

async function LeadMagnetPage({ params }: LeadMagnetProps) {
  if (!params.username || !params.leadMagnetSlug) {
    return <LeadMagnetNotFound returnLink='/'/>;
  }

  const account = await prismadb.account.findUnique({
    where: { username: params.username }
  })

  if (!account) {
    return <LeadMagnetNotFound returnLink='/'/>;
  }

  return <div>LeadMagnetPage</div>;
}

export default LeadMagnetPage;
