"use client";
import {
  IconAlertTriangleFilled,
  IconArrowRight,
  IconX,
} from "@tabler/icons-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
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

  return (
    <div>
      <div className="flex flex-col flex-nowrap items-start gap-1.5 border-b-2 border-zinc-300 bg-zinc-100 p-4">
        {typeof company === "string" && (
          <p className="text-sm font-bold text-zinc-500">{company}</p>
        )}

        {typeof jobTitle === "string" && (
          <p className="text-lg font-bold text-zinc-700">{jobTitle}</p>
        )}

        {typeof comp === "string" && (
          <p className="text-sm font-bold text-zinc-500">{comp}</p>
        )}

        {(typeof workModeDeclared === "string" ||
          workModesFound.length > 0) && (
          <div className="flex-wrap-none flex items-start gap-2">
            {typeof workModeDeclared === "string" && (
              <p className="flex-shrink-0 rounded bg-zinc-400 px-1.5 py-0.5 text-xs font-bold uppercase text-zinc-100">
                {workModeDeclared}
              </p>
            )}
            {workModesFound.length > 0 && (
              <div className="flex flex-wrap gap-1 rounded outline-dashed  outline-2 outline-offset-1 outline-zinc-300">
                <p className="px-1.5 py-0.5 text-xs font-bold uppercase text-zinc-500">
                  {typeof workModeDeclared === "string" && (
                    <>
                      <IconAlertTriangleFilled
                        className="inline text-amber-500"
                        size={16}
                      />{" "}
                    </>
                  )}
                  job mentions: {workModesFound.join(", ")}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <KeywordsFound description={jobDescription ?? undefined} />
    </div>
  );
};

export default Job;
