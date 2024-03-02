"use client";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

const NavBar = () => {
  const { status, data } = useSession();
  const pathname = usePathname(); 

  const buttons = {
    "/dashboard": "Dashboard",
  };

  if (status !== "authenticated") {
    return null;
  }

  return (
    <div className="sticky top-0 z-50 flex border-b-2 bg-white px-4">
      <div className="flex items-center gap-2 p-2">
        <Link href="/" className="flex justify-center gap-1.5">
          <Image src="/bolt.svg" alt="Bolt" width={12} height={12} />
          <p className="text-xl font-semibold">Bolt</p>
        </Link>
      </div>

      <div className="flex items-end gap-2 pb-2">
        {Object.entries(buttons).map(([key, value]) => (
          <Link
            href={key}
            key={key}
            className={twMerge(
              "rounded px-1.5 py-0.5 text-sm font-bold uppercase text-zinc-400 transition hover:bg-zinc-200 hover:text-zinc-600",
              pathname.startsWith(key) && "bg-zinc-100 text-zinc-700",
            )}
          >
            {value}
          </Link>
        ))}
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

const NavBarWithSession = () => {
  return (
    <SessionProvider>
      <NavBar />
    </SessionProvider>
  );
};

export default NavBarWithSession;
