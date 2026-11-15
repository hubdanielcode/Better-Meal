"use server";

import { compare, hash } from "bcrypt";
import { createHash } from "crypto";
import { prisma } from "@/lib/server/services/prisma";
import { sendConfirmationEmail } from "@/lib/server/services/brevo";
import { signUpSchema } from "@/lib/validations/authentication/signUpSchema";
import z from "zod";

const authenticateUser = async (credentials: z.infer<typeof signUpSchema>) => {
  const parsedCredentials = signUpSchema.safeParse(credentials);

  if (!parsedCredentials.success) {
    return "invalidData";
  }

  const parsedEmail = parsedCredentials.data.email;
  const parsedPassword = parsedCredentials.data.password;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: parsedEmail },
      select: { id: true, email: true, password: true },
    });

    if (!existingUser) {
      return "invalidCredentials";
    }

    /* - Conta com senha salva: compara a senha digitada com o hashedPassword que foi salvo no banco - */

    if (existingUser.password) {
      const isPasswordValid = await compare(parsedPassword, existingUser.password);

      if (!isPasswordValid) {
        return "invalidCredentials";
      }

      return { id: existingUser.id, email: existingUser.email };
    }

    /* - Conta criada pelo GitHub ou Google, sem senha: guarda a senha pendente e envia o email de confirmação - */

    const pendingHashedPassword = await hash(parsedPassword, 10);
    const confirmationToken = crypto.randomUUID();
    const hashedConfirmationToken = createHash("sha256").update(confirmationToken).digest("hex");
    const confirmationTokenExpiresAt = new Date(Date.now() + 60 * 10 * 1000);

    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        pendingPassword: pendingHashedPassword,
        token: hashedConfirmationToken,
        tokenExpiresAt: confirmationTokenExpiresAt,
      },
    });

    const confirmationLink = `${process.env.APP_URL}/api/cadastro-padrao/confirmar-email?token=${confirmationToken}`;

    await sendConfirmationEmail({ toEmail: existingUser.email, confirmationLink: confirmationLink });

    return "confirmationEmailSent";
  } catch {
    return "unexpectedError";
  }
};

export { authenticateUser };
