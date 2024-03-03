"use client";

import { IconExternalLink } from "@tabler/icons-react";
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
    <div className="flex flex-col gap-12">
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
  title,
  company,
  jobId,
  compensation,
}) => {
  return (
    <div className="group flex basis-80 flex-col items-start gap-2 rounded-lg border-2 bg-white p-4">
      <div className="flex flex-grow flex-col gap-0.5">
        <p className="max-w-full text-xs font-bold text-zinc-500">{company}</p>
        <h2 className="max-w-full text-lg font-bold text-zinc-700">{title}</h2>
        <p className="max-w-full text-sm font-bold text-zinc-500">
          {compensation}
        </p>
      </div>
      <div className="flex w-full gap-2 rounded-lg opacity-20 group-hover:opacity-100">
        <a
          href={`https://www.linkedin.com/jobs/search/?currentJobId=${jobId}`}
          target="_blank"
          title="Go to job"
        >
          <IconExternalLink />
        </a>
      </div>
    </div>
  );
};

export default SavedJobs;
