"use client";

import { IconX } from "@tabler/icons-react";
import { type ReactNode } from "react";
import bi from "../_interactions/bi";

const TopBar: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <header className="flex select-none items-center p-1.5 ">
      <div className="flex flex-grow gap-1.5">{children}</div>
      <button
        onClick={() => bi.hideIframe()}
        className="material-symbols-rounded rounded-full text-zinc-400 transition hover:text-zinc-500"
      >
        <IconX />
      </button>
    </header>
  );
};

export default TopBar;
