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

// const useScrapeData = (
//   selectors?: PageContext,
// ): {
//   isLoading: boolean;
//   error?: JobDetailError;
//   jobDetails?: JobDetails;
// } => {
//   const { data: location, isLoading: isLoadingLocation } = useQuery({
//     queryKey: jobKeys.currentURL(),
//     queryFn: async () => await bi.getCurrentUrl(),
//   });

//   const jobId = useMemo(() => {
//     if (!location) {
//       return undefined;
//     }

//     const params = new URL(location).searchParams;
//     const jobId = params.get("currentJobId") ?? null;
//     return jobId;
//   }, [location]);

//   const { data: jobTitle, isLoading: isLoadingTitle } = useQuery({
//     queryKey: jobKeys.title(),
//     queryFn: async () => await bi.getTextContent(selectors!.title),
//     enabled: !!selectors?.title,
//   });

//   const { data: comp, isLoading: isLoadingComp } = useQuery({
//     queryKey: jobKeys.comp(),
//     queryFn: async () => {
//       const compString =
//         (await bi.getTextContent(selectors!.compensation)) ?? "";
//       if (compString.includes("$")) {
//         return compString;
//       }
//       return null;
//     },
//     enabled: !!selectors?.compensation,
//   });

//   const { data: company, isLoading: isLoadingCompany } = useQuery({
//     queryKey: jobKeys.company(),
//     queryFn: async () => {
//       const companyString = (await bi.getTextContent(selectors!.company)) ?? "";
//       if (companyString.includes("·")) {
//         return (companyString.split("·")[0] ?? "").trim();
//       }
//       return null;
//     },
//     enabled: !!selectors?.company,
//   });

//   const { data: workModeDeclared, isLoading: isLoadingWorkMode } = useQuery({
//     queryKey: jobKeys.workModel(),
//     queryFn: async () => {
//       const workMode = (await bi.getTextContent(selectors!.workMode)) ?? "";
//       if (workMode) {
//         const workModeLower = workMode.toLowerCase();

//         for (const [key, value] of Object.entries(workModes)) {
//           if (workModeLower.includes(key)) {
//             return value;
//           }
//         }
//       }
//       return null;
//     },
//     enabled: !!selectors?.workMode,
//   });

//   const { data: jobDescription, isLoading: isLoadingDescription } = useQuery({
//     queryKey: jobKeys.description(),
//     queryFn: async () => await bi.getTextContent(selectors!.description),
//     enabled: !!selectors?.description,
//   });

//   const workModesFound = useMemo(() => {
//     const workModesFound: string[] = [];

//     for (const [key, value] of Object.entries(workModes)) {
//       if (
//         value !== workModeDeclared &&
//         jobDescription?.toLowerCase().includes(key)
//       ) {
//         workModesFound.push(key);
//       }
//     }
//     return workModesFound;
//   }, [jobDescription, workModeDeclared]);

//   const workMode = workModeDeclared
//     ? { declared: workModeDeclared, conflicting: workModesFound }
//     : undefined;

//   const { data: savedJobData } = api.jobs.getJob.useQuery(jobId!, {
//     enabled: !!jobId,
//     retry: 0,
//   });

//   const [lastJobSaved, setLastJobSaved] = useState<string | undefined>(
//     undefined,
//   );

//   if (jobId === null) {
//     return { isLoading: false, error: JobDetailError.NO_JOB_ID };
//   }

//   if (jobId) {
//     const jobDetails: JobDetails = {
//       jobId,
//       title: jobTitle ?? "unknown",
//       company: company ?? "unknown",
//       comp: comp ?? undefined,
//       description: jobDescription ?? undefined,
//       workMode,
//       status: savedJobData?.status?.[0]?.status,
//     };

//     const isLoading =
//       isLoadingLocation ||
//       isLoadingTitle ||
//       isLoadingComp ||
//       isLoadingCompany ||
//       isLoadingWorkMode ||
//       isLoadingDescription;

//     if (!isLoading && jobId !== lastJobSaved) {
//       posthog.capture("job_seen", { jobId, jobTitle, comp, workMode });
//       setLastJobSaved(jobId);
//     }

//     return {
//       isLoading,
//       jobDetails,
//     };
//   }

//   return { isLoading: true };
// };

export default useGetJobDetails;
