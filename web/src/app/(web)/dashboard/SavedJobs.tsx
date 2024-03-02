"use client";

import { api } from "~/trpc/react";
import { RouterOutputs } from "~/trpc/shared";

type JobPreviewType = RouterOutputs["jobs"]["getJobPreviews"][number];

const SavedJobs: React.FC = () => {
  const { data: savedJobs } = api.jobs.getJobPreviews.useQuery();

  console.log(savedJobs);

  return (
    <div>
      <h1>Saved Jobs</h1>
      <div className="flex flex-col gap-4">
        {savedJobs?.map((job) => <JobPreview key={job.id} {...job} />)}
      </div>
    </div>
  );
};

const JobPreview: React.FC<JobPreviewType> = ({
  id,
  title,
  company,
  createdAt,
  url,
  jobId,
}) => {
  return (
    <div className="rounded-lg border-2 bg-zinc-100 p-2">
      <h2>{title}</h2>
      <p>{company}</p>
      <p>{createdAt.toString()}</p>
    </div>
  );
};

export default SavedJobs;
