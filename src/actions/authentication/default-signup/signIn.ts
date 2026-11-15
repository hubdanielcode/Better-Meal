"use server";

import { authenticateUser } from "./authenticateUser";
import { cookies } from "next/headers";
import { createSession } from "../../session/createSession";
import { CredentialsPprops } from "@/features/authentication/types/credentials";
import { errorMessages } from "@/lib/server/helpers/errorMessages";
import { signUpSchema } from "@/lib/validations/authentication/signUpSchema";
import { SignInResultProps } from "@/features/authentication/types/signIn";

const signIn = async (credentials: CredentialsPprops): Promise<SignInResultProps> => {
  const parsedCredentials = signUpSchema.safeParse(credentials);

  if (!parsedCredentials.success) {
    return { success: false, code: "invalidData", message: errorMessages.invalidData };
  }

  const result = await authenticateUser(parsedCredentials.data);

  if (result === "invalidData") {
    return { success: false, code: "invalidData", message: errorMessages.invalidData };
  }

  if (result === "invalidCredentials") {
    return { success: false, code: "invalidCredentials", message: errorMessages.invalidCredentials };
  }

  if (result === "unexpectedError") {
    return { success: false, code: "unexpectedError", message: errorMessages.unexpectedError };
  }

  /* - Conta do GitHub ou Google: a sessão só é aberta depois que o usuário confirmar o email - */

  if (result === "confirmationEmailSent") {
    return { success: true, confirmationEmailSent: true, message: "Enviamos um link de confirmação para o seu email." };
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

  return { success: true, id: result.id, email: result.email, message: "Login realizado com sucesso!" };
};

export { signIn as signInAction };
