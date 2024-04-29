import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";
import { Stripe } from "stripe";
import { env } from "~/env";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const checkout = createTRPCRouter({
  createSession: protectedProcedure.mutation(async () => {
    try {
      const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
        apiVersion: "2024-04-10",
      });

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

      return session;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while creating the checkout session",
        });
      }
      throw error;
    }
  }),
});
