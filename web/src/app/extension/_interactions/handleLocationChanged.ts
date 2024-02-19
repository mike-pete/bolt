import { queryClient } from "~/trpc/react";
import { jobKeys } from "./queryKeys";

const handleLocationChanged = async (location: string) => {
  const loc = JSON.parse(location) as { search: string };

  const queryString = loc.search;
  const urlParams = new URLSearchParams(queryString);
  const jobId = urlParams.get("currentJobId");

  await queryClient.invalidateQueries({ queryKey: jobKeys.all });
  queryClient.setQueryData(jobKeys.jobId(), jobId);
};

export default handleLocationChanged;
