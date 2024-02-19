"use client";
import { useQuery } from "@tanstack/react-query";
import bi from "../_interactions/bi";
import { jobTitleSelector } from "../_interactions/selectors";

const Job: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["job", "title"],
    queryFn: async () => {
      const data = await bi.getTextContent(jobTitleSelector);
      return data;
    },
  });

  return (
    <div className="p-4">
      <h1>Job</h1>
      {isLoading ? <p>Loading...</p> : <p>{data ?? ""}</p>}
    </div>
  );
};

export default Job;
