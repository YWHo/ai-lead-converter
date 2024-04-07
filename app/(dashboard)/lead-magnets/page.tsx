import React from "react";
import { auth } from "@clerk/nextjs";
import { prismadb } from "@/lib/prismadb";
import LeadMagnetsContainer from "./components/LeadMagnetsContainer";

const getLeadMagnets = async (userId: string) => {
  try {
    const leadMagnets = await prismadb.leadMagnet.findMany({
      where: { userId },
    });

    return leadMagnets;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getLeads = async (userId: string) => {
  try {
    const leads = await prismadb.lead.findMany({
      where: { userId },
    });

    return leads;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getSubscription = async (userId: string) => {
  try {
    const subscription = await prismadb.subscription.findUnique({
      where: { userId },
    });

    return subscription;
  } catch (err) {
    console.error(err);
    return null;
  }
};

async function LeadMagnetsPage() {
  const { userId } = auth();

  if (!userId) return <div>No user found...</div>;

  const leadMagnetsRequest = getLeadMagnets(userId);
  const leadsRequest = getLeads(userId);
  const subscriptionRequest = getSubscription(userId);

  const [leadMagnets, leads, subscription] = await Promise.all([
    leadMagnetsRequest,
    leadsRequest,
    subscriptionRequest,
  ]);

  // console.log("\n\n-- LeadMagnetsPage leadMagnets", leadMagnets);
  // console.log("LeadMagnetsPage leads", leads);

  return (
    <LeadMagnetsContainer
      leadMagnets={leadMagnets}
      leads={leads}
      subscription={subscription}
    />
  );
}

export default LeadMagnetsPage;
