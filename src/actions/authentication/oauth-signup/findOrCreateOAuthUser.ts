"use server";

import { prisma } from "@/lib/server/services/prisma";

const findOrCreateOAuthUser = async (email: string, avatar: string | null) => {
  const existingUser = await prisma.user.upsert({
    where: { email: email },

    update: {
      profile: { update: { userAvatar: avatar } },
    },

    create: {
      email,
      profile: {
        create: {
          userEmail: email,
          userAvatar: avatar,
          isSubscribed: false,
          activePlan: "nenhum",
          subscriptionExpiresAt: null,
        },
      },
    },
  });

  return existingUser;
};

export { findOrCreateOAuthUser };
