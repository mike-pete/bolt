import { useQuery } from "@tanstack/react-query";
import bi from "../../../_interactions/bi";
import { jobKeys } from "../../../_interactions/queryKeys";

const useGetTextContent = (queryKey: readonly string[], selector?: string) => {
  return useQuery({
    queryKey,
    queryFn: async () => await bi.getTextContent(selector!),
    enabled: !!selector,
  });
};

export const useScrapeText = (
  queryKey: readonly string[],
  context:
    | {
        selector: string;
        mutate?: (scrapedText: string) => string | undefined | null;
      }
    | undefined,
) => {
  const { selector, mutate } = context ?? {};
  const { data: scrapedText, isLoading } = useGetTextContent(
    queryKey,
    selector,
  );

  let data: string | null | undefined = scrapedText ?? undefined;

  if (mutate && scrapedText) {
    data = mutate(scrapedText);
  }

  return { data, isLoading };
};

export const useGetCurrentUrl = () =>
  useQuery({
    queryKey: jobKeys.currentURL(),
    queryFn: async () => await bi.getCurrentUrl(),
  });

export const useGetJobId = (
  mutate?: (location?: string) => string | undefined | null,
) => {
  const { data: location, isLoading } = useGetCurrentUrl();

  let jobId: string | undefined | null = undefined;
  if (location && mutate) {
    jobId = mutate(location);
  }

  return { jobId, isLoading };
};

const workModes = {
  "on-site": "on-site",
  "on site": "on-site",
  "in office": "on-site",
  "in-person": "on-site",
  onsite: "on-site",
  hybrid: "hybrid",
  remote: "remote",
};

export const useGetWorkMode = (
  jobDescription: string,
  context?: { selector: string },
) => {
  const { data: workModeDeclared, isLoading } = useScrapeText(
    jobKeys.workMode(),
    context,
  );

  const workModesFound: string[] = [];

  for (const [key, value] of Object.entries(workModes)) {
    if (
      value !== workModeDeclared?.toLowerCase() &&
      jobDescription?.toLowerCase().includes(key)
    ) {
      workModesFound.push(key);
    }
  }

  const workMode = workModeDeclared
    ? { declared: workModeDeclared, conflicting: workModesFound }
    : undefined;

  return { workMode, isLoading };
};
