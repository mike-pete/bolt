"use client";

import dayjs from "dayjs";
import { useMemo } from "react";
import { api } from "~/trpc/react";
import JobCard, { type JobDetails } from "./JobCard/JobCard";

const SavedJobs: React.FC<{ search?: string }> = ({ search }) => {
  const { data: savedJobs, isLoading } = api.jobs.getJobs.useQuery();

  const jobsByDate = useMemo(() => {
    const dates: { date: string; jobs: JobDetails[] }[] = [];

    if (savedJobs) {
      savedJobs.forEach(({ createdAt, ...jobData }) => {
        const job: JobDetails = {
          jobId: jobData.jobId,
          company: jobData.company,
          title: jobData.title,
          comp: jobData.compensation ?? undefined,
          status: jobData.status?.[0]?.status,
          url: `https://www.linkedin.com/jobs/search/?currentJobId=${jobData.jobId}`,
        };
        const date = dayjs(createdAt).format("MMM D, YYYY");

        if (search) {
          const searchable = `${job.company} ${job.title} ${job.status}`;
          if (!searchable.toLowerCase().includes(search.toLowerCase())) return;
        }

        if (dates.at(-1)?.date === date) {
          dates.at(-1)?.jobs.push(job);
          return;
        } else dates.push({ date, jobs: [job] });
      });
    }

    return dates;
  }, [savedJobs, search]);

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
