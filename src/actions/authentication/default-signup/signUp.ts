"use server";

import { cookies } from "next/headers";
import { createSession } from "../../session/createSession";
import { createUser } from "./createUser";
import { errorMessages } from "@/lib/server/helpers/errorMessages";
import { NewUser } from "@/features/authentication/types/signUp";
import { signUpSchema } from "@/lib/validations/authentication/signUpSchema";

const signUp = async (newUser: NewUser) => {
  const parsedNewUser = signUpSchema.safeParse(newUser);

  if (!parsedNewUser.success) {
    return {
      success: false,
      message: errorMessages.invalidData,
    };
  }

  const result = await createUser(parsedNewUser.data);

  if (result === "invalidData") {
    return {
      success: false,
      message: errorMessages.invalidData,
    };
  }

  if (result === "existingEmail") {
    return {
      success: false,
      message: errorMessages.existingEmail,
    };
  }

  if (result === "unexpectedError") {
    return {
      success: false,
      message: errorMessages.unexpectedError,
    };
  }

  const expiresAt = new Date(Date.now() + 60 * 60 * 24 * 7 * 1000);
  const session = await createSession({ userId: result.id, expiresAt: expiresAt });

  const cookieStore = await cookies();
  cookieStore.set("validSessionId", session.id, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
  });

  return { success: true, message: "Perfil criado com sucesso!" };
};

export { signUp as signUpAction };
