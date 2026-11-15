"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/server/services/prisma";
import { redirect } from "next/navigation";

const logOut = async () => {
  const cookieStore = await cookies();
  const validSessionId = cookieStore.get("validSessionId")?.value;

  if (validSessionId) {
    await prisma.session.update({
      where: { id: validSessionId },
      data: { revokedAt: new Date() },
    });

    cookieStore.delete("validSessionId");
  }
  redirect("/");
};

export { logOut };
