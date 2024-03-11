"use client";

import { IconX } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import bi from "./_interactions/bi";

const NavBar = () => {
  const pathname = usePathname();

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

  return (
    <header className="flex select-none items-center border-b-2 border-zinc-300 p-1.5 bg-white">
      <div className="flex flex-grow justify-evenly gap-1.5">
        {pages.map(({ name, path }) => (
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
