"use client";
import { useQuery } from "@tanstack/react-query";
import bi from "../_interactions/bi";
import { jobKeys } from "../_interactions/queryKeys";
import { jobTitleSelector } from "../_interactions/selectors";

const Job: React.FC = () => {
  // const queryClient = useQueryClient();
  //   const jobId = queryClient.getQueryData(jobKeys.jobId()) as string | null;
  //   console.log("jobId", jobId);
  
  const { data, isLoading } = useQuery({
    queryKey: jobKeys.title(),
    queryFn: async () => {
      const data = await bi.getTextContent(jobTitleSelector);
      return data;
    },
  });

  return (
    <div className="p-4">
      {isLoading ? <p>Loading...</p> : <p>{data ?? ""}</p>}
    </div>
  );
};

export default Job;
