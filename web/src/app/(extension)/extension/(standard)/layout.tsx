"use client";
import { type ReactNode } from "react";
import NavBar from "./NavBar";
// import { useSession } from "next-auth/react";
// import { redirect } from "next/navigation";

const StandardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  // const { data: session } = useSession();

  // if (session?.user?.onboarded === false) {
  //   redirect("/extension/onboarding");
  // }

  return (
    <div className="flex flex-grow flex-col flex-nowrap overflow-hidden bg-zinc-50">
      <NavBar />
      <div className="flex-grow overflow-auto">{children}</div>
    </div>
  );
};

export default StandardLayout;
