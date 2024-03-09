import React from "react";
import JobOverview from "./JobOverview";
import ActionBar, { type StatusValues } from "./ActionBar";

export type JobDetails = {
  jobId: string;
  company: string;
  title: string;
  comp?: string;
  workMode?: {
    declared: string;
    conflicting?: string[];
  };
  status?: StatusValues;
};

const JobCard: React.FC<{
  isLoading: boolean;
  error?: string;
  jobDetails?: JobDetails;
}> = ({ isLoading, error, jobDetails }) => {
  if (isLoading) {
    return (
      <div className="rounded-lg border-2 bg-white">
        <div className="flex animate-pulse flex-col flex-nowrap items-start gap-1.5 p-4">
          <div className="h-5 w-32 rounded bg-gray-200"></div>
          <div className="h-8 w-64 rounded bg-gray-200"></div>
          <div className="h-5 w-24 rounded bg-gray-200"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col flex-nowrap items-start rounded-lg border-2 bg-white">
        <div className="flex flex-col flex-nowrap items-start gap-1.5 p-4">
          <h1>Error: {error}</h1>
        </div>
      </div>
    );
  }

  if (jobDetails) {
    return (
      <div className="flex flex-col flex-nowrap items-start rounded-lg border-2 bg-white">
        <div className="flex flex-col flex-nowrap items-start gap-1.5 p-4">
          <JobOverview details={jobDetails} />
        </div>
        <ActionBar details={jobDetails} />
      </div>
    );
  }
};

export default JobCard;
