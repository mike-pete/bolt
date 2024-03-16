"use server";

import { PostHog } from "posthog-node";
import { env } from "~/env";

const PostHogClient = () => {
  const posthogClient = new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  });
  return posthogClient;
};

export default PostHogClient;
