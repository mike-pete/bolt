"use client";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

const NavBar = () => {
  const { status, data } = useSession();

  if (status !== "authenticated") {
    return null;
  }

  return (
    <div className="sticky top-0 flex border-b-2 px-4">
      <div className="flex items-center gap-2 p-2">
        <Link href="/" className="flex justify-center gap-1.5">
          <Image src="/bolt.svg" alt="Bolt" width={12} height={12} />
          <p className="text-xl font-semibold">Bolt</p>
        </Link>
      </div>

      <div className="flex flex-grow items-center justify-end gap-2 p-2 text-sm font-semibold">
        <p className="">{<span>{data.user?.name}</span>}</p>
        <button
          className="rounded-md bg-sky-400 px-2 py-1 uppercase text-white"
          onClick={() => signOut({ callbackUrl: "/", redirect: true })}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default memo(function NavBarWithSession() {
  return (
    <SessionProvider>
      <NavBar />
    </SessionProvider>
  );
});
