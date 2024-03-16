import { useQuery } from "@tanstack/react-query";
import posthog from "posthog-js";
import { useMemo, useState } from "react";
import { type JobDetails } from "~/app/_components/JobCard/JobCard";
import { api } from "~/trpc/react";
import bi from "../_interactions/bi";
import { jobKeys } from "../_interactions/queryKeys";
import {
  jobCompSelector,
  jobCompanySelector,
  jobDescSelector,
  jobTitleSelector,
  workModeSelector,
} from "../_interactions/selectors";

const workModes = {
  "on-site": "on-site",
  "on site": "on-site",
  "in office": "on-site",
  "in-person": "on-site",
  onsite: "on-site",
  hybrid: "hybrid",
  remote: "remote",
};

export enum JobDetailError {
  NO_JOB_ID,
}

const useGetJobDetails = (): {
  isLoading: boolean;
  error?: JobDetailError;
  jobDetails?: JobDetails;
} => {
  const { data: location, isLoading: isLoadingLocation } = useQuery({
    queryKey: jobKeys.currentURL(),
    queryFn: async () => await bi.getCurrentUrl(),
  });

  const jobId = useMemo(() => {
    if (!location) {
      return undefined;
    }

    const params = new URL(location).searchParams;
    const jobId = params.get("currentJobId") ?? null;
    return jobId;
  }, [location]);

  const { data: jobTitle, isLoading: isLoadingTitle } = useQuery({
    queryKey: jobKeys.title(),
    queryFn: async () => await bi.getTextContent(jobTitleSelector),
  });

  const { data: comp, isLoading: isLoadingComp } = useQuery({
    queryKey: jobKeys.comp(),
    queryFn: async () => {
      const compString = (await bi.getTextContent(jobCompSelector)) ?? "";
      if (compString.includes("$")) {
        return compString;
      }
      return null;
    },
  });

  const { data: company, isLoading: isLoadingCompany } = useQuery({
    queryKey: jobKeys.company(),
    queryFn: async () => {
      const companyString = (await bi.getTextContent(jobCompanySelector)) ?? "";
      if (companyString.includes("·")) {
        return (companyString.split("·")[0] ?? "").trim();
      }
      return null;
    },
  });

  const { data: workModeDeclared, isLoading: isLoadingWorkMode } = useQuery({
    queryKey: jobKeys.workModel(),
    queryFn: async () => {
      const workMode = (await bi.getTextContent(workModeSelector)) ?? "";
      if (workMode) {
        const workModeLower = workMode.toLowerCase();

        for (const [key, value] of Object.entries(workModes)) {
          if (workModeLower.includes(key)) {
            return value;
          }
        }
      }
      return null;
    },
  });

  const { data: jobDescription, isLoading: isLoadingDescription } = useQuery({
    queryKey: jobKeys.description(),
    queryFn: async () => await bi.getTextContent(jobDescSelector),
  });

  const workModesFound = useMemo(() => {
    const workModesFound: string[] = [];

    for (const [key, value] of Object.entries(workModes)) {
      if (
        value !== workModeDeclared &&
        jobDescription?.toLowerCase().includes(key)
      ) {
        workModesFound.push(key);
      }
    }
    return workModesFound;
  }, [jobDescription, workModeDeclared]);

  const workMode = workModeDeclared
    ? { declared: workModeDeclared, conflicting: workModesFound }
    : undefined;

  const { data: savedJobData } = api.jobs.getJob.useQuery(jobId!, {
    enabled: !!jobId,
    retry: 0,
  });

  const [lastJobSaved, setLastJobSaved] = useState<string | undefined>(
    undefined,
  );

  if (jobId === null) {
    return { isLoading: false, error: JobDetailError.NO_JOB_ID };
  }

  if (jobId) {
    const jobDetails: JobDetails = {
      jobId,
      title: jobTitle ?? "unknown",
      company: company ?? "unknown",
      comp: comp ?? undefined,
      description: jobDescription ?? undefined,
      workMode,
      status: savedJobData?.status?.[0]?.status,
    };

    const isLoading =
      isLoadingLocation ||
      isLoadingTitle ||
      isLoadingComp ||
      isLoadingCompany ||
      isLoadingWorkMode ||
      isLoadingDescription;

    if (!isLoading && jobId !== lastJobSaved) {
      posthog.capture("job_seen", { jobId, jobTitle, comp, workMode });
      setLastJobSaved(jobId);
    }

    return {
      isLoading,
      jobDetails,
    };
  }

  return { isLoading: true };
};

export default useGetJobDetails;
