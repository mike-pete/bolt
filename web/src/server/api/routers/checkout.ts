import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";
import { Stripe } from "stripe";
import { z } from "zod";
import { env } from "~/env";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const checkout = createTRPCRouter({
  createSession: protectedProcedure
    .input(z.object({ priceId: z.string().startsWith("price_") }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { priceId } = input;

      try {
        const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
          apiVersion: "2024-04-10",
        });

        const session = await stripe.checkout.sessions.create({
          metadata: {
            userId,
          },
          automatic_tax: {
            enabled: true,
          },
          customer_email: ctx.session.user.email ?? undefined,
          payment_method_types: ["card"],
          line_items: [
            {
              price: priceId,
              quantity: 1,
            },
          ],
          mode: "subscription",
          success_url: `${env.NEXT_PUBLIC_URL}/settings?paymentStatus=success`,
          cancel_url: `${env.NEXT_PUBLIC_URL}/settings?paymentStatus=cancel`,
        });

        return { sessionId: session.id };
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
