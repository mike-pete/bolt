"use client";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";

const GoogleAuthButton: React.FC = () => {
  const { status } = useSession();
  if (status === "authenticated") {
    return redirect("/dashboard");
  }

  return (
    <button onClick={() => signIn("google")}>
      <Image
        src="/siginWithGoogle.svg"
        alt="sign in with Google"
        width="175"
        height="40"
      />
    </button>
  );
};

export default GoogleAuthButton;
