import { errorMessages } from "@/lib/server/helpers/errorMessages";
import { errorResponse } from "@/lib/server/helpers/errorResponse";
import { getCurrentUser } from "@/actions/authentication/default-signup/getCurrentUser";
import { NextResponse } from "next/server";

const GET = async () => {
  try {
    /* - Quem pergunta é identificado pela sessão do cookie, nunca por um id vindo na URL - */

    // 1. Se o id viesse na URL, qualquer pessoa poderia consultar a assinatura de outro usuário

    const user = await getCurrentUser();

    if (!user) {
      return errorResponse("notLoggedIn", 401, errorMessages.notLoggedIn);
    }

    /* - Assinatura ativa: perfil marcado como assinante e com plano pago - */

    const subscriptionActive = Boolean(user.profile?.isSubscribed && user.profile.activePlan !== "nenhum");

    return NextResponse.json({ subscriptionActive }, { status: 200 });
  } catch {
    return errorResponse("unexpectedError", 500, errorMessages.unexpectedError);
  }
};

export { GET };
