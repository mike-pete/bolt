import { type Status } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const jobsRouter = createTRPCRouter({
  // addJobSeen: protectedProcedure
  //   .input(
  //     z.object({
  //       jobId: z.string().min(1).max(191),
  //       title: z.string().min(1).max(191),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const userId = ctx.session.user.id;

  //     const jobSeen = await ctx.db.jobSeen.create({
  //       data: {
  //         userId,
  //         jobId: input.jobId,
  //         title: input.title,
  //       },
  //     });

  //     return jobSeen;
  //   }),

  saveJob: protectedProcedure
    .input(
      z.object({
        jobId: z.string().min(1).max(191),
        title: z.string().min(1).max(255),
        company: z.string().min(1).max(255),
        description: z.optional(z.string().min(1).max(65535)),
        compensation: z.optional(z.string().min(1).max(191)),
        status: z
          .enum([
            "Saved",
            "Applied",
            "Interviewing",
            "Rejected",
            "Offer",
            "Archived",
          ])
          .default("Saved"),
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
          description: input?.description,
          compensation: input?.compensation,
          updatedAt: new Date(),
          status: {
            create: {
              status: input.status as Status,
            },
          },
        },
        update: {
          userId,
          jobId: input.jobId,
          title: input.title,
          company: input.company,
          description: input?.description,
          compensation: input?.compensation,
          updatedAt: new Date(),
          status: {
            create: {
              status: input.status as Status,
            },
          },
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

  getJobs: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const jobPreviews = await ctx.db.job.findMany({
      where: {
        userId,
      },
      select: {
        title: true,
        company: true,
        createdAt: true,
        compensation: true,
        jobId: true,

        status: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return jobPreviews;
  }),

  getJob: protectedProcedure
    .input(z.string().min(1).max(191))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      try {
        const job = await ctx.db.job.findFirstOrThrow({
          where: {
            userId,
            jobId: input,
          },
          include: {
            status: {
              orderBy: {
                createdAt: "desc",
              },
              take: 1,
            },
          },
        });

        return job;
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2025") {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Job not found.",
            });
          }
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while fetching job details.",
        });
      }
    }),
});
