import { prismadb } from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs";
import React from "react";
import { generateFromEmail } from "unique-username-generator";
import AccountContainer from "./components/AccountContainer";

async function AccountPage() {
  const fetchAccount = async (userId: string) => {
    try {
      let account = await prismadb.account.findUnique({ where: { userId } });
      if (!account) {
        const user = await currentUser();
        if (!user) throw new Error("User not found");
        const baseEmail = user.emailAddresses[0].emailAddress;
        account = await prismadb.account.create({
          data: {
            userId,
            email: baseEmail,
            username: generateFromEmail(baseEmail, 3),
          },
        });
      }

      return account;
    } catch (err) {
      console.log("AccountPage error: fetchAccount:\n", err);
    }
  };

  const fetchSubscription = (userId: string) => {
    return prismadb.subscription.findUnique({
      where: { userId },
    });
  };

  const { userId } = auth();
  console.log("AccountPage: userId: ", userId);
  if (!userId) throw new Error("User not found");

  const [account, subscription] = await Promise.all([
    fetchAccount(userId),
    fetchSubscription(userId),
  ]);

  if (!account) {
    return <div>ERROR: User not found</div>;
  }

  return <AccountContainer account={account} subscription={subscription} />;
}

export default AccountPage;
