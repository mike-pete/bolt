"use client";
import { useQuery } from "@tanstack/react-query";
import bi from "../_interactions/bi";
import { jobKeys } from "../_interactions/queryKeys";
import { jobCompSelector, jobTitleSelector } from "../_interactions/selectors";

const Job: React.FC = () => {
  // const queryClient = useQueryClient();
  // const jobId = queryClient.getQueryData(jobKeys.jobId()) as string | null;
  // console.log("jobId", jobId);

  const { data: jobTitle } = useQuery({
    queryKey: jobKeys.title(),
    queryFn: async () => await bi.getTextContent(jobTitleSelector),
  });

  const { data: comp } = useQuery({
    queryKey: jobKeys.comp(),
    queryFn: async () => {
        const compString = await bi.getTextContent(jobCompSelector)
        if (compString && compString.includes("$")) {
            return compString
        }
        return null
    },
  });

  return (
    <div className="flex flex-col flex-nowrap items-start gap-1 border-b-2 border-zinc-300 bg-zinc-100 p-4">
      {/* {company && (
        <p className="text-sm font-bold text-zinc-500">{company}</p>
    )} */}

      {typeof jobTitle === "string" && (
        <p className="text-lg font-bold text-zinc-700">{jobTitle}</p>
      )}

      {typeof comp === "string" && (
        <p className="text-sm font-bold text-zinc-500">{comp}</p>
      )}
      {/* 

    {shouldShowApplied && (
        <label
            htmlFor="applied"
            className="flex cursor-pointer select-none items-center gap-1.5 uppercase"
        >
            <input
                type="checkbox"
                id="applied"
                name="applied"
                checked={checked}
                onChange={handleToggleChecked}
                className="peer h-3.5 w-3.5 cursor-pointer appearance-none rounded border-2 border-zinc-400 bg-zinc-100 outline outline-offset-[-4px] outline-zinc-100 transition checked:border-emerald-500 checked:bg-emerald-400"
            />
            <p className="text-sm font-bold text-zinc-400 transition peer-checked:text-emerald-600">
                APPLIED
            </p>
        </label>
    )} */}
    </div>
  );
};

export default Job;
