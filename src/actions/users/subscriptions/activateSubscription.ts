import { ActivePlan } from "@/prisma/generated/prisma/enums";
import { errorMessages } from "@/lib/server/helpers/errorMessages";
import { prisma } from "@/lib/server/services/prisma";
import { stripe } from "@/lib/server/services/stripe";
import Stripe from "stripe";

const paidPlans: ActivePlan[] = ["semana", "mês", "ano"];

const activateSubscription = async (session: Stripe.Checkout.Session) => {
  /* - Definições - */

  const userId = session.metadata?.user;
  const planType = session.metadata?.planType as ActivePlan | undefined;
  const subscriptionId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id;

  /* - Validações - */

  // 1. Só aceita plano pago: "nenhum" ou qualquer texto fora do enum nunca pode ativar assinatura

  if (!userId || !subscriptionId || !planType || !paidPlans.includes(planType)) {
    return {
      success: false,
      message: errorMessages.invalidData,
    };
  }

  try {
    /* - Data de expiração: o Stripe só informa o fim do período na assinatura, não na sessão do checkout - */

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const periodEnd = subscription.items.data[0]?.current_period_end;

    if (!periodEnd) {
      return {
        success: false,
        message: errorMessages.invalidData,
      };
    }

    /* - Salvando a assinatura no perfil: id, plano, flag e expiração ficam todos no mesmo lugar - */

    await prisma.profile.update({
      where: { userId: userId },
      data: {
        stripeSubscriptionId: subscriptionId,
        isSubscribed: true,
        activePlan: planType,
        subscriptionExpiresAt: new Date(periodEnd * 1000),
      },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      console.log("\x1b[38;2;140;1;253m%s\x1b[0m", error.message);
    } else {
      console.log("\x1b[38;2;140;1;253m%s\x1b[0m", errorMessages.unexpectedError);
    }

    return {
      success: false,
      message: errorMessages.unexpectedError,
    };
  }
};

export { activateSubscription };
