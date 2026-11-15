import { errorMessages } from "@/lib/server/helpers/errorMessages";
import { prisma } from "@/lib/server/services/prisma";
import Stripe from "stripe";

const registerFailedPayment = async (invoice: Stripe.Invoice) => {
  /* - Definições - */

  const invoiceSubscription = invoice.parent?.subscription_details?.subscription;
  const subscriptionId = typeof invoiceSubscription === "string" ? invoiceSubscription : invoiceSubscription?.id;

  /* - Validações - */

  if (!subscriptionId) {
    return {
      success: false,
      message: errorMessages.invalidData,
    };
  }

  /* - Buscando o perfil dono da assinatura - */

  let userId: string | undefined;

  try {
    const userProfile = await prisma.profile.findUnique({
      where: {
        stripeSubscriptionId: subscriptionId,
      },

      select: { userId: true },
    });

    // 1. Assinatura que não está salva em nenhum perfil: não há quem desativar

    if (!userProfile?.userId) {
      return {
        success: false,
        message: errorMessages.invalidData,
      };
    }

    userId = userProfile.userId;
  } catch {
    return {
      success: false,
      message: errorMessages.unexpectedError,
    };
  }

  /* - Desativando o acesso do perfil - */

  try {
    await prisma.profile.update({
      where: { userId: userId },
      data: { isSubscribed: false },
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

export { registerFailedPayment };
