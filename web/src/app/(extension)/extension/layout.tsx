"use client";

import { useSession } from "next-auth/react";
import posthog from "posthog-js";
import { useEffect, type ReactNode } from "react";
import AuthScreen from "./AuthScreen";

const ExtensionLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session === null) {
      posthog.reset();
    } else if (session?.user.email) {
      posthog.identify(session.user.email, {
        email: session.user.email,
        full_name: session.user.name,
      });
    }
  }, [session, session?.user.email]);

  return (
    <div className="flex h-screen max-h-screen flex-col flex-nowrap overflow-hidden bg-zinc-50">
      <AuthScreen>{children}</AuthScreen>
    </div>
  );
};

export default ExtensionLayout;
