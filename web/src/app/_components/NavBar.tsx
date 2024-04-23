"use client";
import { Menu } from "@headlessui/react";
import { useSession } from "next-auth/react";
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
    <div className="sticky top-0 z-40 flex items-center border-b-2 bg-white px-4">
      <div className="flex items-center gap-2 p-2">
        <Link href="/" className="flex justify-center gap-1.5">
          <Image src="/bolt.svg" alt="Bolt" width={12} height={12} />
          <p className="text-xl font-semibold">Bolt</p>
        </Link>
      </div>

      <div className="flex flex-grow items-end gap-2">
        {Object.entries(buttons).map(([key, value]) => (
          <Link
            href={key}
            key={key}
            className={twMerge(
              "relative flex items-center gap-1 rounded-lg px-3 py-1.5 text-left text-xs font-bold uppercase text-zinc-600 transition hover:bg-zinc-200 focus:outline-none",
              pathname.startsWith(key) && "bg-zinc-100 text-zinc-700",
            )}
          >
            {value}
          </Link>
        ))}
      </div>

      <UserDropdown name={data.user?.name ?? undefined} />
    </div>
  );
};

const UserDropdown: React.FC<{ name?: string }> = ({ name }) => {
  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button className="relative flex items-center gap-1 rounded-lg px-3 py-1.5 text-left text-xs font-bold uppercase text-zinc-600 transition hover:bg-zinc-200 focus:outline-none">
          {name ?? "Account"}
        </Menu.Button>
      </div>
      <Menu.Items className="absolute right-0 z-10 mt-1 flex flex-col gap-1 overflow-auto rounded-lg border-2 bg-white p-1 text-base shadow-lg outline-none">
        <Menu.Item>
          {({ active }) => (
            <Link
              className={twMerge(
                "cursor-pointer select-none truncate rounded-lg px-3 py-1.5 text-xs font-bold uppercase text-zinc-600 transition",
                active && "bg-zinc-200",
              )}
              href="/settings"
            >
              Settings
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <Link
              className={twMerge(
                "cursor-pointer select-none truncate rounded-lg px-3 py-1.5 text-xs font-bold uppercase text-zinc-600 transition",
                active && "bg-zinc-200",
              )}
              href="/auth/signout"
            >
              Sign Out
            </Link>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default NavBar;
