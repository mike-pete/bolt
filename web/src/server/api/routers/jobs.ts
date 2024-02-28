import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const jobsRouter = createTRPCRouter({
  addJobSeen: protectedProcedure
    .input(
      z.object({
        jobId: z.string().min(1).max(191),
        title: z.string().min(1).max(191),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const jobSeen = await ctx.db.jobSeen.create({
        data: {
          userId,
          jobId: input.jobId,
          title: input.title,
        },
      });

      return jobSeen;
    }),
});
