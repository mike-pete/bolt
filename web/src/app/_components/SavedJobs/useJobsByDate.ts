"use client";

import dayjs from "dayjs";
import { api } from "~/trpc/react";
import { type JobDetails } from "../JobCard/JobCard";

const useJobsByDate = (search?: string) => {
  const { data: savedJobs } = api.jobs.getJobs.useQuery();
  const dates: { date: string; jobs: JobDetails[] }[] = [];

  if (savedJobs) {
    savedJobs.forEach(({ createdAt, ...jobData }) => {
      const job: JobDetails = {
        jobId: jobData.jobId,
        company: jobData.company,
        title: jobData.title,
        comp: jobData.compensation ?? undefined,
        status: jobData.status?.[0]?.status,
        url: `https://www.linkedin.com/jobs/view/${jobData.jobId}`,
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
};

export default useJobsByDate;
