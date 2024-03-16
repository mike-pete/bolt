"use client";
import { signOut } from "next-auth/react";
import posthog from "posthog-js";
import { useEffect } from "react";
import LoadingSpinner from "~/app/_components/LoadingSpinner";

const SignIn: React.FC = () => {
  useEffect(() => {
    posthog.reset();
    void signOut({ callbackUrl: "/", redirect: true });
  }, []);
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <LoadingSpinner size={30} />
    </div>
  );
};

export default SignIn;
