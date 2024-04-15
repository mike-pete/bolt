"use client";

import { IconSearch } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import SavedJobs from "~/app/_components/SavedJobs/SavedJobs";
import { api } from "~/trpc/react";
import CommitGrid from "./CommitGrid";
import JobNotesModal from "./JobNotesModal";
import Streak from "./Streak";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const jobId = searchParams.get("job");
  const { data: jobDetails, isLoading: isLoadingJobDetails } =
    api.jobs.getJob.useQuery(jobId!, {
      enabled: !!jobId,
      retry: 0,
    });

  return (
    <>
      <div className="flex flex-grow flex-col">
        <div className="flex justify-center gap-2 bg-zinc-100 p-8">
          <div className="flex w-full max-w-7xl gap-2">
            <Streak />
            <CommitGrid />
          </div>
        </div>

        <div className="flex justify-center gap-2 p-8">
          <div className="flex w-full max-w-7xl flex-col gap-2">
            <div className="relative flex flex-nowrap items-center pb-4">
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
      </div>

      {jobId && (
        <JobNotesModal
          open={!!jobId}
          onClose={() => {
            void router.push(pathname, { scroll: false });
          }}
          isLoadingJobDetails={isLoadingJobDetails}
          jobDetails={jobDetails}
        />
      )}
    </>
  );
};

export default Dashboard;
