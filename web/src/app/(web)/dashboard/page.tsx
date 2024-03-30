"use client";

import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import SavedJobs from "~/app/_components/SavedJobs";

const Dashboard = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex-grow flex-col bg-zinc-50">
      <div className="bg-zinc-100 p-8 lg:px-[8%]">
        <div className="h-10 bg-red-200 "></div>
      </div>
      <div className="p-8 lg:pl-[8%] lg:pr-[4%]">
        <div className="relative flex flex-nowrap items-center pb-4 pr-[6%]">
          <IconSearch
            size={20}
            stroke={3}
            className="absolute left-3 text-zinc-500"
          />
          <input
            placeholder="Search"
            className="max-w-sm flex-grow gap-1 rounded-lg border-2 bg-white p-2 pl-9 font-semibold text-zinc-800"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
        </div>

        <SavedJobs search={search} />
      </div>
    </div>
  );
};

export default Dashboard;
