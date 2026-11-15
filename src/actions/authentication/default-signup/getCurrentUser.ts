import "server-only";
import { cookies } from "next/headers";
import { prisma } from "@/lib/server/services/prisma";
import { cache } from "react";

const getCurrentUser = cache(async () => {
  const cookieStore = await cookies();
  const validSessionId = cookieStore.get("validSessionId")?.value;

  if (!validSessionId) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: { id: validSessionId },
  });

  if (!session || session.expiresAt < new Date() || session.revokedAt) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      email: true,
      profile: {
        select: {
          userAvatar: true,
          isSubscribed: true,
          activePlan: true,
        },
      },
    },
  });

  return user;
});

export { getCurrentUser };
