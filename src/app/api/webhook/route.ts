import { activateSubscription } from "@/actions/users/subscriptions/activateSubscription";
import { cancelSubscription } from "@/actions/users/subscriptions/cancelSubscription";
import { errorMessages } from "@/lib/server/helpers/errorMessages";
import { errorResponse } from "@/lib/server/helpers/errorResponse";
import { NextRequest, NextResponse } from "next/server";
import { registerFailedPayment } from "@/actions/users/subscriptions/registerFailedPayment";
import { stripe } from "@/lib/server/services/stripe";
import Stripe from "stripe";

const POST = async (request: NextRequest) => {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature || "", webhookSecret);
  } catch {
    return errorResponse("unexpectedError", 500, errorMessages.unexpectedError);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const stripeSession = event.data.object as Stripe.Checkout.Session;
        const result = await activateSubscription(stripeSession);

        if (!result.success) {
          return errorResponse("unexpectedError", 500, result.message);
        }

        break;
      }

      case "invoice.payment_failed": {
        const stripePayment = event.data.object as Stripe.Invoice;
        await registerFailedPayment(stripePayment);
        break;
      }

      case "customer.subscription.deleted": {
        const stripeSubscription = event.data.object as Stripe.Subscription;
        await cancelSubscription(stripeSubscription);
        break;
      }

      default:
        console.log("\x1b[38;2;140;1;253m%s\x1b[0m", "Unhandled event type." + event.type);
    }
  } catch {
    return errorResponse("invalidData", 400, errorMessages.invalidData);
  }

  return NextResponse.json({ recieved: true }, { status: 200 });
};

export { POST };
