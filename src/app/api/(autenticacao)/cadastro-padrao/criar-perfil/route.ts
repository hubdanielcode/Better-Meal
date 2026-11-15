import { cookies } from "next/headers";
import { createSession } from "@/actions/session/createSession";
import { createUser } from "@/actions/authentication/default-signup/createUser";
import { errorMessages } from "@/lib/server/helpers/errorMessages";
import { errorResponse } from "@/lib/server/helpers/errorResponse";
import { NextRequest, NextResponse } from "next/server";
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
    const result = await createUser(parsedBody.data);

    if (result === "invalidData") {
      return errorResponse("invalidData", 400, errorMessages.invalidData);
    }

    if (result === "existingEmail") {
      return errorResponse("existingEmail", 409, errorMessages.existingEmail);
    }

    if (result === "unexpectedError") {
      return errorResponse("unexpectedError", 500, errorMessages.unexpectedError);
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

    return NextResponse.json({ id: result.id, email: result.email, message: "Perfil criado com sucesso!" }, { status: 201 });
  } catch {
    return errorResponse("unexpectedError", 500, errorMessages.unexpectedError);
  }
};

export { POST };
