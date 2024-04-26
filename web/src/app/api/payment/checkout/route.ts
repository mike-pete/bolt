import { env } from "~/env";
import stripe from "../stripe";

export async function POST(request: Request) {
  console.log("request", request);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1P9pleJ8IkSaOlr1sH4jkVoX",
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${env.NEXT_PUBLIC_URL}/payment/success`,
      cancel_url: `${env.NEXT_PUBLIC_URL}/payment/cancel`,
    });

    return Response.json(session);
  } catch (error) {
    console.log("error", error);
    return new Response("something went wrong", { status: 500 });
  }
}
