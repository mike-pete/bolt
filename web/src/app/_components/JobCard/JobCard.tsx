import { type Status } from "@prisma/client";
import React from "react";
import { type JobDetailError } from "~/app/(extension)/extension/job/useGetJobDetails";
import ActionBar from "./ActionBar";
import JobOverview from "./JobOverview";

export type JobDetails = {
  jobId: string;
  company: string;
  title: string;
  comp?: string;
  description?: string;
  workMode?: {
    declared: string;
    conflicting?: string[];
  };
  status?: Status;
  url?: string;
};

const JobCard: React.FC<{
  isLoading: boolean;
  error?: JobDetailError;
  jobDetails?: JobDetails;
}> = ({ isLoading, error, jobDetails }) => {
  if (isLoading) {
    return (
      <div className="rounded-lg border-2 bg-white w-80">
        <div className="flex animate-pulse flex-col flex-nowrap items-start gap-1 p-4">
          <div className="h-5 w-32 rounded bg-gray-200"></div>
          <div className="h-8 w-64 rounded bg-gray-200"></div>
          <div className="h-5 w-24 rounded bg-gray-200"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col flex-nowrap items-start rounded-lg border-2 bg-white w-80">
        <div className="flex flex-col flex-nowrap items-start gap-1 p-4">
          <h1>Error: {error}</h1>
        </div>
      </div>
    );
  }

  if (jobDetails) {
    return (
      <div className="flex flex-col flex-nowrap items-start rounded-lg border-2 bg-white w-80">
        <div className="flex flex-col flex-nowrap items-start gap-1 p-4">
          <JobOverview details={jobDetails} />
        </div>
        <ActionBar details={jobDetails} />
      </div>
    );
  }
};

export default JobCard;
