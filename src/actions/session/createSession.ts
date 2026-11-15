"use server";

import { prisma } from "@/lib/server/services/prisma";

interface SessionProps {
  userId: string;
  expiresAt: Date;
}

const createSession = async ({ userId, expiresAt }: SessionProps) => {
  /* - Limpando as sessões expiradas e revogadas daquele usuário para evitar que o banco cresça innfinitamente - */

  await prisma.session.deleteMany({
    where: { userId: userId, OR: [{ expiresAt: { lt: new Date() } }, { revokedAt: { not: null } }] },
  });

  /* - Criando a sessão nova- */

  const newlyCreatedSession = await prisma.session.create({
    data: {
      userId: userId,
      expiresAt: expiresAt,
    },
  });

  return newlyCreatedSession;
};

export { createSession };
