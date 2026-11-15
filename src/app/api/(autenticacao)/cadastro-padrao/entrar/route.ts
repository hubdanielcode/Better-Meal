import { errorMessages } from "@/lib/server/helpers/errorMessages";
import { errorResponse } from "@/lib/server/helpers/errorResponse";
import { NextRequest, NextResponse } from "next/server";
import { signInAction } from "@/actions/authentication/default-signup/signIn";
import { signUpSchema } from "@/lib/validations/authentication/signUpSchema";

const POST = async (request: NextRequest) => {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return errorResponse("invalidData", 400, errorMessages.invalidData);
  }

  const parsedBody = signUpSchema.safeParse(body);

  if (!parsedBody.success) {
    return errorResponse("invalidData", 400, errorMessages.invalidData);
  }

  try {
    const result = await signInAction(parsedBody.data);

    if (!result.success && result.code === "invalidData") {
      return errorResponse(result.code, 400, errorMessages.invalidData);
    }

    if (!result.success && result.code === "invalidCredentials") {
      return errorResponse(result.code, 401, errorMessages.invalidCredentials);
    }

    if (!result.success) {
      return errorResponse(result.code, 500, errorMessages.unexpectedError);
    }

    /* - Conta do GitHub ou Google: a sessão só é aberta depois que o usuário confirmar o email - */

    if ("confirmationEmailSent" in result) {
      return NextResponse.json({ message: result.message, confirmationEmailSent: true }, { status: 202 });
    }

    return NextResponse.json({ id: result.id, email: result.email, message: result.message }, { status: 200 });
  } catch {
    return errorResponse("unexpectedError", 500, errorMessages.unexpectedError);
  }
};

export { POST };
