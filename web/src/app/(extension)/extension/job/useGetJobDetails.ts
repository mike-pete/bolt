import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
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

// TODO: fetch saved job data
// type JobData = RouterInputs["jobs"]["saveJob"];

const useGetJobDetails = (): {
  isLoading: boolean;
  error?: string;
  jobDetails?: JobDetails;
} => {
  const { data: jobTitle } = useQuery({
    queryKey: jobKeys.title(),
    queryFn: async () => await bi.getTextContent(jobTitleSelector),
  });

  const { data: comp } = useQuery({
    queryKey: jobKeys.comp(),
    queryFn: async () => {
      const compString = (await bi.getTextContent(jobCompSelector)) ?? "";
      if (compString.includes("$")) {
        return compString;
      }
      return null;
    },
  });

  const { data: company } = useQuery({
    queryKey: jobKeys.company(),
    queryFn: async () => {
      const companyString = (await bi.getTextContent(jobCompanySelector)) ?? "";
      if (companyString.includes("·")) {
        return (companyString.split("·")[0] ?? "").trim();
      }
      return null;
    },
  });

  const { data: workModeDeclared } = useQuery({
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

  const { data: jobDescription } = useQuery({
    queryKey: jobKeys.description(),
    queryFn: async () => await bi.getTextContent(jobDescSelector),
  });

  const { data: keywordGroups, isLoading: loadingKeywordGroups } =
    api.keywords.getKeywordGroups.useQuery();

  const jobId: string | undefined = useQueryClient().getQueryData(
    jobKeys.jobId(),
  );

  const { mutate: addJobSeen } = api.jobs.addJobSeen.useMutation();

  const [lastJobSaved, setLastJobSaved] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (typeof jobId === "string" && jobId.trim() && lastJobSaved !== jobId) {
      addJobSeen({
        jobId,
        title: jobTitle ?? `unknown-${Math.floor(Math.random() * 1000000) + 1}`,
      });
      setLastJobSaved(jobId);
    }
  }, [addJobSeen, jobId, jobTitle, lastJobSaved]);

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


  const jobDetails: JobDetails | undefined = jobId
  ? {
      jobId,
      title: jobTitle ?? "unknown",
      company: company ?? "unknown",
      comp: comp ?? undefined,
      description: jobDescription ?? undefined,
      workMode: {
        declared: workModeDeclared ?? "undefined",
        conflicting: workModesFound,
      },
    }
  : undefined;

  return { isLoading: true, jobDetails };
};

export default useGetJobDetails;
