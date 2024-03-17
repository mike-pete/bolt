"use client";

import { redirect } from "next/navigation";
// import { useSession } from "next-auth/react";

const Extension = () => {
  // const { data: session } = useSession();

  // if (session?.user?.onboarded === false) {
  //   redirect("/extension/onboarding");
  // }

  redirect("/extension/job");
};

export default Extension;
