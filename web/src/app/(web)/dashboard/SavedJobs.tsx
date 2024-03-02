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
    <div>
      <div className="flex flex-col gap-12 p-8">
        {jobsByDate?.map((job) => (
          <div key={job.date}>
            <h2 className="p-2 text-xl font-semibold text-zinc-800">
              {job.date}
            </h2>
            <div className="flex flex-wrap gap-2">
              {job.jobs.map((job) => (
                <JobPreview key={job.id} {...job} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const JobPreview: React.FC<Omit<JobPreviewType, "createdAt">> = ({
  id,
  title,
  company,
  url,
  jobId,
}) => {
  return (
    <div className="max-w-96 min-w-64 rounded-lg border-2 bg-white p-4">
      <h2 className="truncate">{title}</h2>
      <p className="text-sm font-semibold text-zinc-600">{company}</p>
    </div>
  );
};

export default SavedJobs;
