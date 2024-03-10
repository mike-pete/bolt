import { queryClient } from "~/trpc/react";
import { jobKeys } from "./queryKeys";

const handleLocationChanged = async (_location: string) => {
  await queryClient.invalidateQueries({ queryKey: jobKeys.all });
};

export default handleLocationChanged;
