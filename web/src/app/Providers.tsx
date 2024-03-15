"use client";
import { SessionProvider } from "next-auth/react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import type { ReactNode } from "react";
import { env } from "~/env";
import { TRPCReactProvider } from "~/trpc/react";

if (typeof window !== "undefined") {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: `${env.NEXT_PUBLIC_URL}/ingest`,
    ui_host: "https://app.posthog.com",
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.debug();
    },
  });
}

const Providers: React.FC<{ children: ReactNode }> = ({ children }) => (
  <PostHogProvider client={posthog}>
    <SessionProvider>
      <TRPCReactProvider>{children}</TRPCReactProvider>
    </SessionProvider>
  </PostHogProvider>
);

export default Providers;