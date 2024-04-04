"use client";

import { type ReactNode } from "react";
import { api } from "~/trpc/react";
import JobCard from "../JobCard/JobCard";
import useJobsByDate from "./useJobsByDate";

const SavedJobs: React.FC<{ search?: string }> = ({ search }) => {
  const { data: savedJobs, isLoading } = api.jobs.getJobs.useQuery();

  const jobsByDate = useJobsByDate(search);

  if (isLoading) {
    return (
      <CardGrid>
        <JobCard isLoading={true} />
        <JobCard isLoading={true} />
        <JobCard isLoading={true} />
      </CardGrid>
    );
  }

  if (!savedJobs?.length) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-lg border-2 bg-white p-4 min-h-[40vh] items-center justify-center">
        <p className="text-xl font-semibold text-zinc-400 ">
          Your saved jobs will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      {jobsByDate?.map((job) => (
        <div key={job.date}>
          <h2 className="p-2 text-2xl font-bold text-zinc-400">{job.date}</h2>
          <CardGrid>
            {job.jobs.map((job) => (
              <JobCard key={job.jobId} jobDetails={job} isLoading={false} />
            ))}
          </CardGrid>
        </div>
      ))}
    </div>
  );
};

const CardGrid: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="grid w-full gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ">
      {children}
    </div>
  );
};

export default SavedJobs;
