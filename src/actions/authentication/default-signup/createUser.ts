"use server";

import { hash } from "bcrypt";
import { prisma } from "@/lib/server/services/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { signUpSchema } from "@/lib/validations/authentication/signUpSchema";
import z from "zod";

const createUser = async (newUser: z.infer<typeof signUpSchema>) => {
  const parsedNewUser = signUpSchema.safeParse(newUser);

  if (!parsedNewUser.success) {
    return "invalidData";
  }

  const parsedEmail = parsedNewUser.data.email;
  const parsedPassword = parsedNewUser.data.password;

  try {
    /* - Verificando se já existe um usuário com esse email - */

    const existingUser = await prisma.user.findUnique({
      where: { email: parsedEmail },
      select: { id: true, email: true, password: true },
    });

    if (existingUser) {
      // 1. Conta criada pelo GitHub ou Google (não tem senha salva)

      if (!existingUser.password) {
        return "existingEmail";
      }
    }

    /* - Hasheando a senha para salvar no banco - */

    const hashedPassword = await hash(parsedPassword, 10);

    /* - Criando o usuário para salvar no banco - */

    const newlyCreatedUser = await prisma.user.create({
      data: {
        email: parsedEmail,
        password: hashedPassword,
        profile: {
          create: {
            userEmail: parsedEmail,
            userAvatar: null,
            isSubscribed: false,
            activePlan: "nenhum",
            subscriptionExpiresAt: null,
          },
        },
      },

      select: {
        email: true,
        id: true,
        profile: {
          select: {
            userAvatar: true,
            isSubscribed: true,
            activePlan: true,
            subscriptionExpiresAt: true,
          },
        },
      },
    });

    return newlyCreatedUser;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
      const errorMeta = JSON.stringify(error.meta);

      if (errorMeta.includes("email")) {
        return "existingEmail";
      }
    }

    return "unexpectedError";
  }
};

export { createUser };
