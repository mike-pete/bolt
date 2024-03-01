"use client";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const { status, data } = useSession();
  const pathname = usePathname();
  console.log(pathname);

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

      {Object.entries(buttons).map(([key, value]) => (
        <Link
          href={key}
          key={key}
          className={`p-2 ${pathname.startsWith(key) ? "border-b-2 border-sky-400" : ""}`}
        >
          {value}
        </Link>
      ))}

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
