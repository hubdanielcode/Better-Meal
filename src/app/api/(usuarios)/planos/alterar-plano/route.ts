import { getCurrentUser } from "@/actions/authentication/default-signup/getCurrentUser";
import { priceIdMap } from "@/features/users/subscription/utils/constants/priceIdMap";
import { errorMessages } from "@/lib/server/helpers/errorMessages";
import { errorResponse } from "@/lib/server/helpers/errorResponse";
import { prisma } from "@/lib/server/services/prisma";
import { stripe } from "@/lib/server/services/stripe";
import { NextRequest, NextResponse } from "next/server";

const POST = async (request: NextRequest) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return errorResponse("noUser", 404, errorMessages.noUser);
    }

    const { newPlan } = await request.json();

    if (!newPlan) {
      return errorResponse("newPlanError", 400, errorMessages.newPlanError);
    }

    const userProfile = await prisma.profile.findUnique({
      where: { userId: user.id },
    });

    if (!userProfile) {
      return errorResponse("noProfile", 404, errorMessages.noProfile);
    }

    if (!userProfile.stripeSubscriptionId) {
      return errorResponse("missingStripeSubscription", 404, errorMessages.missingStripeSubscription);
    }

    const subscriptionId = userProfile.stripeSubscriptionId;
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const subscriptionItemId = subscription.items.data[0]?.id;

    if (!subscriptionItemId) {
      return errorResponse("missingStripeSubscription", 404, errorMessages.missingStripeSubscription);
    }

    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
      items: [
        {
          id: subscriptionId,
          price: priceIdMap[newPlan],
        },
      ],
      proration_behavior: "create_prorations",
    });

    await prisma.profile.update({
      where: { userId: user.id },
      data: {
        isSubscribed: true,
        activePlan: newPlan,
        stripeSubscriptionId: updatedSubscription.id,
      },
    });

    return NextResponse.json({ subscription: updatedSubscription });
  } catch {
    return errorResponse("unexpectedError", 500, errorMessages.unexpectedError);
  }
};

export { POST };
