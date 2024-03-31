"use client";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import SavedJobs from "~/app/_components/SavedJobs/SavedJobs";

const History: React.FC = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="p-4">
      <div className="relative flex flex-nowrap items-center pb-4">
        <IconSearch
          size={20}
          stroke={3}
          className="absolute left-3 text-zinc-500"
        />
        <input
          placeholder="Search"
          className="w-full gap-1 rounded-lg border-2 bg-white p-2 pl-9 font-semibold text-zinc-800"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </div>
      <SavedJobs search={search} />
    </div>
  );
};

export default History;
