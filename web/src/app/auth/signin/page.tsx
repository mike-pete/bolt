"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

const SignIn: React.FC = () => {
  const { status } = useSession();

  if (status === "authenticated") {
    return redirect("/");
  }

  return (
    <div className="flex h-screen justify-center">
      <button onClick={() => signIn("google")}>
        <Image
          src="/siginWithGoogle.svg"
          alt="sign in with Google"
          width="175"
          height="40"
        />
      </button>
    </div>
  );
};

export default SignIn;
