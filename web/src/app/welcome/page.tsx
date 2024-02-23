"use client";
import { SessionProvider } from "next-auth/react";
import GoogleAuthButton from "../_components/GoogleAuthButton";
import { IconArrowDown } from "@tabler/icons-react";

const Welcome = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-3xl font-bold text-zinc-700">
          Thank you for installing Bolt!
        </h1>
        <p>Sign in below to get started.</p>
        <IconArrowDown />
      </div>
      <SessionProvider>
        <GoogleAuthButton />
      </SessionProvider>
    </div>
  );
};

export default Welcome;
