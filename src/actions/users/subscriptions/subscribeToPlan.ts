"use server";

import { ActivePlan } from "@/prisma/generated/prisma/enums";
import { errorMessages } from "@/lib/server/helpers/errorMessages";
import { getCurrentUser } from "@/actions/authentication/default-signup/getCurrentUser";
import { priceIdMap } from "@/features/users/subscription/utils/constants/priceIdMap";
import { stripe } from "@/lib/server/services/stripe";

const subscribeToPlan = async (planType: ActivePlan) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return {
        success: false,
        message: errorMessages.notLoggedIn,
      };
    }

    if (user.profile?.isSubscribed && user.profile.activePlan !== "nenhum") {
      return {
        success: false,
        message: errorMessages.alreadySubscribed,
      };
    }

    const stripeSession = await stripe.checkout.sessions.create({
      allowed_payment_method_types: ["card"],
      line_items: [
        {
          price: priceIdMap[planType],
          quantity: 1,
        },
      ],

      customer_email: user.email,
      mode: "subscription",
      metadata: { user: user.id, planType },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/assinaturas`,
    });

    if (!stripeSession.url) {
      return {
        success: false,
        message: errorMessages.unexpectedError,
      };
    }

    return {
      success: true,
      url: stripeSession.url,
    };
  } catch {
    return {
      success: false,
      message: errorMessages.unexpectedError,
    };
  }
};

export { subscribeToPlan as subscribeToPlanAction };
