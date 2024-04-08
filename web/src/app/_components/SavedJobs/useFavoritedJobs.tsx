"use client";

import dayjs from "dayjs";
import { api } from "~/trpc/react";

const useFavoritedJobs = (search?: string) => {
  const { data: savedJobs } = api.jobs.getJobs.useQuery();

  return savedJobs
    ?.filter((job) => {
      if (search) {
        const searchable = `${job.company} ${job.title} ${job.status}`;
        if (!searchable.toLowerCase().includes(search.toLowerCase()))
          return false;
      }
      return job.favoritedAt !== null;
    })
    .sort((a, b) => {
      return dayjs(b.favoritedAt).diff(dayjs(a.favoritedAt));
    }).map((job) => {
        return {...job, url: `https://www.linkedin.com/jobs/view/${job.jobId}`,}
    });
};

export default useFavoritedJobs;
