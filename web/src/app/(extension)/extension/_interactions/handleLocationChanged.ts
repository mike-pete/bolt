import { queryClient } from "~/trpc/react";
import { pageContexts } from "../(standard)/job/scrapingHooks/pageContexts/pageContext";
import bi from "./bi";
import { jobKeys } from "./queryKeys";

const urlHasJob = (url: string) => {
  for (const { match } of pageContexts) {
    if (match(url)) {
      return true;
    }
  }
  return false;
};

const handleLocationChanged = (location: string) => {
  const prevURL: string = queryClient.getQueryData(jobKeys.currentURL()) ?? "";
  const currentURL: string =
    (JSON.parse(location) as { href?: string })?.href ?? "";

  void queryClient.invalidateQueries({ queryKey: jobKeys.all });

  if (!urlHasJob(currentURL)) {
    void bi.hideIframe();
    return;
  }

  if (!urlHasJob(prevURL) && urlHasJob(currentURL)) {
    void bi.showIframe();
    return;
  }
};

export default handleLocationChanged;
