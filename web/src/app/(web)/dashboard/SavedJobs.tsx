"use client";

import dayjs from "dayjs";
import { useMemo } from "react";
import { api } from "~/trpc/react";
import { type RouterOutputs } from "~/trpc/shared";

type JobPreviewType = RouterOutputs["jobs"]["getJobPreviews"][number];

const SavedJobs: React.FC = () => {
  const { data: savedJobs } = api.jobs.getJobPreviews.useQuery();

  const jobsByDate = useMemo(() => {
    const dates: { date: string; jobs: Omit<JobPreviewType, "createdAt">[] }[] =
      [];

    if (savedJobs) {
      savedJobs.forEach(({ createdAt, ...job }) => {
        const date = dayjs(createdAt).format("MMM D, YYYY");

        if (dates.at(-1)?.date === date) {
          dates.at(-1)?.jobs.push(job);
          return;
        } else dates.push({ date, jobs: [job] });
      });
    }

    return dates;
  }, [savedJobs]);

  return (
    <div className="flex flex-col gap-12 p-8">
      {jobsByDate?.map((job) => (
        <div key={job.date}>
          <h2 className="p-2 text-2xl font-bold text-zinc-400">{job.date}</h2>
          <div className="flex flex-wrap gap-2 ">
            {job.jobs.map((job) => (
              <JobPreview key={job.id} {...job} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const JobPreview: React.FC<Omit<JobPreviewType, "createdAt">> = ({
  id,
  title,
  company,
  url,
  jobId,
  compensation,
}) => {
  return (
    <div className="flex basis-80 flex-col items-start gap-0.5 rounded-lg border-2 bg-white p-4">
      <p className="max-w-full text-xs font-bold text-zinc-500">{company}</p>
      <h2 className="max-w-full text-lg font-bold text-zinc-700">{title}</h2>
      <p className="max-w-full text-sm font-bold text-zinc-500">
        {compensation}
      </p>
    </div>
  );
};

export default SavedJobs;
