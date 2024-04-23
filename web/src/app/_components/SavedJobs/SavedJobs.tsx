"use client";

import { IconHeart } from "@tabler/icons-react";
import { type ReactNode } from "react";
import { api } from "~/trpc/react";
import JobCard from "../JobCard/JobCard";
import useFavoritedJobs from "./useFavoritedJobs";
import useJobsByDate from "./useJobsByDate";

const SavedJobs: React.FC<{ search?: string }> = ({ search }) => {
  const { data: savedJobs, isLoading } = api.jobs.getJobs.useQuery();

  const jobsByDate = useJobsByDate(search);
  const favoritedJobs = useFavoritedJobs(search);

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
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 rounded-lg border-2 bg-white p-4">
        <p className="text-xl font-semibold text-zinc-400 ">
          Your saved jobs will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      {(!search || Boolean(search && favoritedJobs?.length)) && (
        <div>
          <h2 className="p-2 text-2xl font-bold text-zinc-400">
            Favorite Jobs
          </h2>
          <CardGrid>
            {favoritedJobs?.map((job) => (
              <JobCard
                key={job.jobId}
                jobDetails={job}
                isLoading={false}
                className="border-red-200 bg-red-50"
              />
            ))}
            {favoritedJobs?.length === 0 && (
              <div className="flex w-full flex-col flex-nowrap items-start overflow-hidden rounded-lg border-2 border-red-300 bg-white">
                <div className="flex flex-grow flex-col flex-nowrap items-start gap-1 p-4">
                  <p className="text-lg font-semibold text-zinc-500">
                    Your favorite jobs will appear here.{" "}
                    <IconHeart
                      className="inline fill-red-400 stroke-red-600"
                      size={20}
                    />
                  </p>
                </div>
              </div>
            )}
          </CardGrid>
        </div>
      )}
      {jobsByDate?.map((job) => (
        <div key={job.date}>
          <h2 className="p-2 text-2xl font-bold text-zinc-400">{job.date}</h2>
          <CardGrid>
            {job.jobs.map((job) => (
              <JobCard
                key={job.jobId}
                jobDetails={job}
                isLoading={false}
                className={`${job.favoritedAt !== null && "border-red-200 bg-red-50"}`}
              />
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
