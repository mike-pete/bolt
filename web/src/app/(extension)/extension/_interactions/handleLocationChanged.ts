import { queryClient } from "~/trpc/react";
import { pageContexts } from "../(standard)/job/scrapingHooks/pageContexts/pageContext";
import bi from "./bi";
import { jobKeys } from "./queryKeys";

const handleLocationChanged = (location: string) => {
  void queryClient.invalidateQueries({ queryKey: jobKeys.all });
  const currentURL: string =
    (JSON.parse(location) as { href?: string })?.href ?? "";

  for (const { match } of pageContexts) {
    if (match(currentURL)) {
      void bi.showIframe();
      return;
    }
  }

  void bi.hideIframe();
};

export default handleLocationChanged;
