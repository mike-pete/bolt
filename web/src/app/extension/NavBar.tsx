"use client";

import { IconX } from "@tabler/icons-react";
import Link from "next/link";
import bi from "./_interactions/bi";

const NavBar = () => {
  const pages = [
    {
      name: "job",
      path: "/extension/job",
    },
    {
      name: "keywords",
      path: "/extension/keywords",
    },
    // {
    //   name: "history",
    //   path: "/extension/history",
    // },
  ];

  // TODO: get current page from location
  const currentPage = "";

  return (
    <header className="flex select-none items-center border-b-2 border-zinc-300 p-1.5">
      <div className="flex flex-grow justify-evenly gap-1.5">
        {pages.map(({ name, path }) => (
          <Link
            href={path}
            className="flex-grow rounded text-center font-bold uppercase text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-500 aria-selected:bg-zinc-200 aria-selected:text-zinc-600"
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
