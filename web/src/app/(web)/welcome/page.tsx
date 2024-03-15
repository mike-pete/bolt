"use client";
import { IconArrowDown } from "@tabler/icons-react";
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
      <GoogleAuthButton />
    </div>
  );
};

export default Welcome;
