import { type Status } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const jobsRouter = createTRPCRouter({
  saveJob: protectedProcedure
    .input(
      z.object({
        jobId: z.string().min(1).max(191),
        title: z.string().min(1).max(255),
        company: z.string().min(1).max(255),
        description: z.optional(z.string().min(1).max(65535)),
        compensation: z.optional(z.string().min(1).max(191)),
        status: z.enum([
          "Saved",
          "Applied",
          "Interviewing",
          "Rejected",
          "Offer",
          "Archived",
        ]),
        favoritedAt: z.nullable(z.coerce.date()),
        note: z.optional(z.string().min(1).max(65535)),
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
          favoritedAt: input.favoritedAt,
          status: {
            create: {
              status: input.status as Status,
            },
          },
          notes: input.note
            ? {
                create: {
                  note: input.note,
                },
              }
            : undefined,
        },
        update: {
          userId,
          jobId: input.jobId,
          title: input.title,
          company: input.company,
          description: input?.description,
          compensation: input?.compensation,
          updatedAt: new Date(),
          favoritedAt: input.favoritedAt,
          status: {
            create: {
              status: input.status as Status,
            },
          },
          notes: input.note
            ? {
                create: {
                  note: input.note,
                },
              }
            : undefined,
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

  deleteNote: protectedProcedure
    .input(z.string().min(1).max(191))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return await ctx.db.notes.delete({
        where: {
          id: input,
          job: {
            userId,
          },
        },
      });
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
        favoritedAt: true,
        status: {
          select: {
            status: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
        notes: {
          select: {
            id: true,
            note: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return jobPreviews.map((job) => ({
      ...job,
      status: job.status[0]?.status,
    }));
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
          select: {
            title: true,
            company: true,
            createdAt: true,
            compensation: true,
            jobId: true,
            favoritedAt: true,
            status: {
              select: {
                status: true,
              },
              orderBy: {
                createdAt: "desc",
              },
              take: 1,
            },
            notes: {
              select: {
                id: true,
                note: true,
                createdAt: true,
              },
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        });

        return { ...job, status: job.status[0]?.status };
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
