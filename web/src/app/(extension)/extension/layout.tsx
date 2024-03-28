"use client";

import { useSession } from "next-auth/react";
import posthog from "posthog-js";
import { useEffect, useState, type ReactNode } from "react";
import AuthScreen from "./AuthScreen";

const ExtensionLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session } = useSession();

  const [identified, setIdentified] = useState(false);

  useEffect(() => {
    if (session === null) {
      posthog.reset();
    } else if (!identified && session?.user.email) {
      posthog.identify(session.user.email, {
        email: session.user.email,
        name: session.user.name,
      });
      setIdentified(true);
    }
  }, [identified, session, session?.user.email]);

  return (
    <div className="flex h-screen max-h-screen flex-col flex-nowrap overflow-hidden bg-zinc-50">
      <AuthScreen>{children}</AuthScreen>
    </div>
  );
};

export default ExtensionLayout;
