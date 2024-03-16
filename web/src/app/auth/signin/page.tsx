"use client";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import posthog from "posthog-js";
import { useEffect } from "react";
import LoadingSpinner from "~/app/_components/LoadingSpinner";

const SignIn: React.FC = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      void signIn("google", { callbackUrl: "/auth/signin/" });
    }
  }, [status]);

  if (session?.user.email) {
    posthog.identify(session.user.email);
    return redirect("https://www.linkedin.com/jobs/search/");
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <LoadingSpinner size={30} />
    </div>
  );
};

export default SignIn;
