import posthog from "posthog-js";
import { useState } from "react";
import { type JobDetails } from "~/app/_components/JobCard/JobCard";
import { pageContexts } from "./pageContexts/pageContext";
import {
  useGetCompany,
  useGetCompensation,
  useGetCurrentUrl,
  useGetDescription,
  useGetJobId,
  useGetTitle,
  useGetWorkMode,
} from "./scrapingHooks";

export enum JobDetailError {
  NO_JOB_ID,
}
const useGetPageContext = () => {
  const { data: currentURL, isLoading } = useGetCurrentUrl();

  if (isLoading) {
    return undefined;
  }

  if (!currentURL) {
    throw new Error("No current URL found");
  }

  for (const { match, context } of pageContexts) {
    if (match(currentURL)) {
      return context;
    }
  }

  return null;
};

const useGetJobDetails = (): {
  isLoading: boolean;
  error?: JobDetailError;
  jobDetails?: JobDetails;
} => {
  const pageContext = useGetPageContext();

  const { jobId, isLoading: isLoadingJobId } = useGetJobId(
    pageContext?.jobId?.mutate ?? undefined,
  );

  const { title, isLoading: isLoadingTitle } = useGetTitle(pageContext?.title);

  const { description, isLoading: isLoadingDescription } = useGetDescription(
    pageContext?.description,
  );

  const { company, isLoading: isLoadingCompany } = useGetCompany(
    pageContext?.company,
  );

  const { compensation, isLoading: isLoadingCompensation } = useGetCompensation(
    pageContext?.compensation,
  );

  const { workMode, isLoading: isLoadingWorkMode } = useGetWorkMode(
    description ?? "",
    pageContext?.workMode,
  );

  const [lastJobSaved, setLastJobSaved] = useState<string | undefined>(
    undefined,
  );

  if (pageContext === null || jobId === null) {
    return { isLoading: false, error: JobDetailError.NO_JOB_ID };
  }

  if (jobId) {
    const isLoading =
      isLoadingJobId ||
      isLoadingTitle ||
      isLoadingCompensation ||
      isLoadingCompany ||
      isLoadingWorkMode ||
      isLoadingDescription;

    if (!isLoading && jobId !== lastJobSaved) {
      posthog.capture("job_seen", { jobId, title, compensation, workMode });
      setLastJobSaved(jobId);
    }

    return {
      isLoading: isLoading,
      jobDetails: {
        jobId,
        title: title ?? "unknown",
        description: description ?? undefined,
        company: company ?? "unknown",
        comp: compensation ?? undefined,
        workMode: workMode,
      },
    };
  }

  return { isLoading: true };
};

export default useGetJobDetails;
