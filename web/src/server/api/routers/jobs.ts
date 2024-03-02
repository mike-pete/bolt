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

  saveJob: protectedProcedure
    .input(
      z.object({
        jobId: z.string().min(1).max(191),
        title: z.string().min(1).max(191),
        company: z.string().min(1).max(191),
        description: z.string().min(1).max(65535),
        url: z.string().url().min(1).max(2048),
        compensation: z.optional(z.string().min(1).max(191)),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const jobSaved = await ctx.db.job.upsert({
        create: {
          userId,
          jobId: input.jobId,
          title: input.title,
          company: input.company,
          description: input.description,
          url: input.url,
          compensation: input.compensation,
          updatedAt: new Date(),
        },
        update: {
          userId,
          jobId: input.jobId,
          title: input.title,
          company: input.company,
          description: input.description,
          url: input.url,
          compensation: input.compensation,
          updatedAt: new Date(),
        },
        where: {
          userId_jobId: {
            userId,
            jobId: input.jobId,
          },
        },
      });

      return jobSaved;
    }),

  getJobPreviews: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const jobPreviews = await ctx.db.job.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        title: true,
        company: true,
        createdAt: true,
        url: true,
        compensation: true,
        jobId: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return jobPreviews;
  }),
});
