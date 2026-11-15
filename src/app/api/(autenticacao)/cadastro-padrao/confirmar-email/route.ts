import { cookies } from "next/headers";
import { createHash } from "crypto";
import { createSession } from "@/actions/session/createSession";
import { prisma } from "@/lib/server/services/prisma";
import { NextRequest, NextResponse } from "next/server";

const GET = async (request: NextRequest) => {
  try {
    const confirmationToken = request.nextUrl.searchParams.get("token");

    if (!confirmationToken) {
      return NextResponse.redirect(new URL("/cadastro?erro=confirmacao", request.url));
    }

    const hashedConfirmationToken = createHash("sha256").update(confirmationToken).digest("hex");

    /* - Só aceita token que confere, não expirou e tem senha pendente - */

    const pendingUser = await prisma.user.findUnique({
      where: {
        token: hashedConfirmationToken,
        tokenExpiresAt: { gt: new Date() },
        pendingPassword: { not: null },
      },

      select: { id: true, pendingPassword: true },
    });

    if (!pendingUser || !pendingUser.pendingPassword) {
      return NextResponse.redirect(new URL("/cadastro?erro=confirmacao", request.url));
    }

    /* - Passa a senha pendente para a senha da conta e limpa os campos do token - */

    await prisma.user.update({
      where: { id: pendingUser.id },
      data: {
        password: pendingUser.pendingPassword,
        pendingPassword: null,
        token: null,
        tokenExpiresAt: null,
      },
    });

    const expiresAt = new Date(Date.now() + 60 * 60 * 24 * 7 * 1000);
    const newSession = await createSession({ userId: pendingUser.id, expiresAt: expiresAt });

    const cookieStore = await cookies();
    cookieStore.set("validSessionId", newSession.id, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: expiresAt,
    });

    return NextResponse.redirect(new URL("/dieta", request.url));
  } catch {
    return NextResponse.redirect(new URL("/cadastro?erro=confirmacao", request.url));
  }
};

export { GET };
