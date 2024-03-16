"use client";

import { IconX } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import bi from "./_interactions/bi";

const NavBar = () => {
  const pathname = usePathname();
  const { status } = useSession();

  const pages = [
    {
      name: "job",
      path: "/extension/job",
    },
    {
      name: "keywords",
      path: "/extension/keywords",
    },
    {
      name: "saved",
      path: "/extension/saved",
    },
  ];

  const currentPage = "";

  const authenticated = status === "authenticated";

  return (
    <header
      className={twMerge(
        "flex select-none items-center  p-1.5 ",
        authenticated && "border-b-2 border-zinc-300 bg-white",
      )}
    >
      <div className="flex flex-grow justify-evenly gap-1.5">
        {authenticated &&
          pages.map(({ name, path }) => (
            <Link
              href={path}
              className={twMerge(
                "flex-grow rounded px-1.5 py-0.5 text-center text-sm font-bold uppercase text-zinc-400 transition hover:bg-zinc-200 hover:text-zinc-600",
                pathname.startsWith(`/extension/${name}`) &&
                  "bg-zinc-100 text-zinc-700",
              )}
              aria-selected={currentPage === name}
              key={name}
            >
              {name}
            </Link>
          ))}
      </div>
      <button
        onClick={() => bi.hideIframe()}
        className="material-symbols-rounded rounded-full text-zinc-400 transition hover:text-zinc-500"
      >
        <IconX />
      </button>
    </header>
  );
};

export default NavBar;
