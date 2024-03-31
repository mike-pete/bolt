"use client";

import { api } from "~/trpc/react";
import JobCard from "../JobCard/JobCard";
import useJobsByDate from "./useJobsByDate";

const SavedJobs: React.FC<{ search?: string }> = ({ search }) => {
  const { data: savedJobs, isLoading } = api.jobs.getJobs.useQuery();

  const jobsByDate = useJobsByDate(search);

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-2 ">
        <JobCard isLoading={true} />
        <JobCard isLoading={true} />
        <JobCard isLoading={true} />
      </div>
    );
  }

  if (!savedJobs?.length) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-lg border-2 bg-white p-4">
        <p className="text-lg font-bold text-zinc-400 ">
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
          <div className="flex flex-wrap gap-2 ">
            {job.jobs.map((job) => (
              <JobCard key={job.jobId} jobDetails={job} isLoading={false} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedJobs;
