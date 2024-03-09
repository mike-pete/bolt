"use client";
import { IconArrowRight, IconX } from "@tabler/icons-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import JobCard, { type JobDetails } from "~/app/_components/JobCard/JobCard";
import LoadingSpinner from "~/app/_components/LoadingSpinner";
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
import KeywordsFound from "./KeywordsFound";

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

const Job: React.FC = () => {
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

  if (loadingKeywordGroups) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner size={30} />
      </div>
    );
  }

  if (jobId === null) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
        <p className="text-3xl font-bold text-zinc-600">Oh no...</p>
        <p>
          It looks like this page {"isn't"} currently supported. If you think it
          should be, please let me know!
        </p>
        <a
          className="font-semibold text-blue-600"
          href="mailto:mike@boltapply.com"
        >
          mike@boltapply.com
        </a>
        <div className="flex flex-grow items-center justify-center">
          <button
            className="flex gap-2 rounded-lg bg-sky-400 px-3 py-2 font-semibold text-white"
            onClick={() => bi.goToPage("https://linkedin.com/jobs/search/")}
          >
            Back to LinkedIn Jobs <IconArrowRight />
          </button>
        </div>
        <p className="text-zinc-400">
          Tip: In the meantime, you can click the <IconX className="inline" />{" "}
          icon in the top right corner to hide the extension for now.
        </p>
      </div>
    );
  }

  if (!keywordGroups?.length) {
    return (
      <div className="flex flex-col gap-4 p-4">
        <p className="text-center text-2xl font-semibold">Getting Started</p>
        <div className="rounded border p-2">
          <p className="text-lg font-semibold">Step 1</p>
          <p>
            Head to the keywords tab and add the keywords you usually look for
            in a job description.
          </p>
        </div>
        <div className="rounded border p-2">
          <p className="text-lg font-semibold">Step 2</p>
          <p>
            Come back to the job tab to see how many times those keywords were
            found in the description.
          </p>
        </div>
      </div>
    );
  }

  const jobDetails: JobDetails | undefined = jobId
    ? {
        jobId,
        title: jobTitle ?? "unknown",
        company: company ?? "unknown",
        comp: comp ?? undefined,
        workMode: {
          declared: workModeDeclared ?? "undefined",
          conflicting: workModesFound,
        },
      }
    : undefined;

  return (
    <div className="flex min-h-full flex-col gap-2 bg-zinc-50 p-4">
      <JobCard isLoading={jobDetails === undefined} jobDetails={jobDetails} />
      <KeywordsFound description={jobDescription ?? undefined} />
    </div>
  );
};

export default Job;
