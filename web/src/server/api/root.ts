import { createTRPCRouter } from "~/server/api/trpc";
import { jobsRouter } from "./routers/jobs";
import { keywordsRouter } from "./routers/keywords";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  keywords: keywordsRouter,
  jobs: jobsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
