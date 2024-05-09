import Stripe from "stripe";
import { env } from "~/env";
import { db } from "~/server/db";

const startSubscription = async (userId: string, stripeCustomerId: string) => {
  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      stripeCustomerId,
      planActive: true,
    },
  });
};

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature") ?? "";
  const body = await request.text();

  let event: Stripe.Event;

  try {
    event = Stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch {
    return Response.json(null, { status: 401 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      // Handle checkout.session.completed event
      const session: Stripe.Checkout.Session = event.data.object;
      console.log(session);
      const userId = session.metadata?.userId;
      const stripeCustomerId = session.customer;

      if (userId && stripeCustomerId) {
        await startSubscription(userId, stripeCustomerId as string);
        return Response.json(null, { status: 200 });
      } else {
        return Response.json(
          { message: "missing userId or customerId" },
          { status: 200 },
        );
      }
    // case "customer.subscription.created":
    //   // Handle customer.subscription.created event
    //   return Response.json(null, { status: 200 });
    case "customer.subscription.deleted":
      // Handle customer.subscription.deleted event
      return Response.json(null, { status: 200 });
    case "customer.subscription.updated":
      return Response.json(null, { status: 200 });

    case "charge.captured":
      return Response.json(null, { status: 200 });
    case "charge.failed":
      return Response.json(null, { status: 200 });
    case "charge.succeeded":
      console.log("charge succeeded!", event);
      return Response.json(null, { status: 200 });
    default:
      return Response.json(null, { status: 500 });
  }
}
