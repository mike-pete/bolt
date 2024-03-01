"use client";
import { IconArrowDown, IconExclamationCircle } from "@tabler/icons-react";
import { SessionProvider } from "next-auth/react";
import GoogleAuthButton from "../../_components/GoogleAuthButton";

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
      <div className="flex max-w-96 gap-2 rounded-lg border bg-zinc-50 p-2 text-red-600">
        <IconExclamationCircle size={20} />
        <p className="gap-2 text-sm font-semibold opacity-85">
          If your account {"hasn't"} been activated you {"won't"} be able to
          login.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
