import { type Status } from "@prisma/client";
import React, { type ReactNode } from "react";
import { type JobDetailError } from "~/app/(extension)/extension/(standard)/job/scrapingHooks/useGetJobDetails";
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
  favoritedAt: Date | null;
  createdAt?: Date;
};

const JobCard: React.FC<{
  isLoading: boolean;
  error?: JobDetailError;
  jobDetails?: JobDetails;
}> = ({ isLoading, error, jobDetails }) => {
  if (isLoading) {
    return (
      <CardContainer>
        <div className="flex w-full animate-pulse flex-col flex-nowrap items-start gap-1 p-4">
          <div className="h-5 w-3/5 rounded bg-gray-200"></div>
          <div className="h-8 w-4/5 rounded bg-gray-200"></div>
          <div className="h-5 w-2/5 rounded bg-gray-200"></div>
        </div>
      </CardContainer>
    );
  }

  if (error) {
    return (
      <CardContainer>
        <div className="flex flex-col flex-nowrap items-start gap-1 p-4">
          <h1>Error: {error}</h1>
        </div>
      </CardContainer>
    );
  }

  if (jobDetails) {
    return (
      <CardContainer>
        <div className="flex flex-grow flex-col flex-nowrap items-start gap-1 p-4">
          <JobOverview details={jobDetails} />
        </div>
        <ActionBar details={jobDetails} />
      </CardContainer>
    );
  }
};

const CardContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex w-full flex-col flex-nowrap items-start rounded-lg border-2 bg-white">
      {children}
    </div>
  );
};

export default JobCard;
