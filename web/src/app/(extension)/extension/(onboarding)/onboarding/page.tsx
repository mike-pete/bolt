"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const OnboardingPage = () => {
  const { data: session } = useSession();
  if (session?.user?.onboarded === true) {
    redirect("/extension");
  }

  return (
    <div className="flex h-full flex-col p-2 gap-2">
    </div>
  );
};

export default OnboardingPage;
