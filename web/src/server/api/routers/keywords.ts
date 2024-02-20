import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const keywordsRouter = createTRPCRouter({
  createKeywordGroup: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const keywordGroup = await ctx.db.keywordGroups.create({
      data: {
        userId,
        title: "",
      },
    });
    return keywordGroup;
  }),

  getKeywordGroups: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const keywordGroups = await ctx.db.keywordGroups.findMany({
      where: {
        userId,
      },
      include: {
        keywords: true,
      },
    });
    return keywordGroups;
  }),

  updateKeywordGroup: protectedProcedure
    .input(
      z.object({
        keywordGroupId: z.string().min(1).max(191),
        title: z.string().min(1).max(191),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const keywordGroup = await ctx.db.keywordGroups.update({
        where: {
          userId,
          id: input.keywordGroupId,
        },
        data: {
          title: input.title,
        },
      });
      return keywordGroup;
    }),

  deleteKeywordGroup: protectedProcedure
    .input(
      z.object({
        keywordGroupId: z.string().min(1).max(191),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      await ctx.db.keywordGroups.delete({
        where: {
          userId,
          id: input.keywordGroupId,
        },
      });
    }),

  createKeyword: protectedProcedure
    .input(
      z.object({
        keywordGroupId: z.string().min(1).max(191),
        keyword: z.string().min(1).max(191),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const keyword = await ctx.db.keywords.create({
        data: {
          userId,
          keywordGroupId: input.keywordGroupId,
          keyword: input.keyword,
        },
      });
      return keyword;
    }),

  deleteKeyword: protectedProcedure
    .input(z.string().min(1).max(191))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      await ctx.db.keywords.delete({
        where: {
          userId,
          id: input,
        },
      });
    }),
});
