"use client";
import { useQuery } from "@tanstack/react-query";
import bi from "../_interactions/bi";
import { jobKeys } from "../_interactions/queryKeys";
import {
  jobCompSelector,
  jobCompanySelector,
  jobDescSelector,
  jobTitleSelector,
} from "../_interactions/selectors";
import KeywordsFound from "./KeywordsFound";

const Job: React.FC = () => {
  const { data: jobTitle } = useQuery({
    queryKey: jobKeys.title(),
    queryFn: async () => await bi.getTextContent(jobTitleSelector),
  });

  const { data: comp } = useQuery({
    queryKey: jobKeys.comp(),
    queryFn: async () => {
      const compString = (await bi.getTextContent(jobCompSelector)) ?? "";
      if (compString.includes("$")) {
        return compString;
      }
      return null;
    },
  });

  const { data: company } = useQuery({
    queryKey: jobKeys.company(),
    queryFn: async () => {
      const companyString = (await bi.getTextContent(jobCompanySelector)) ?? "";
      if (companyString.includes("·")) {
        return (companyString.split("·")[0] ?? "").trim();
      }
      return null;
    },
  });

  const { data: jobDescription } = useQuery({
    queryKey: jobKeys.description(),
    queryFn: async () => await bi.getTextContent(jobDescSelector),
  });

  return (
    <div>
      <div className="flex flex-col flex-nowrap items-start gap-1 border-b-2 border-zinc-300 bg-zinc-100 p-4">
        {typeof company === "string" && (
          <p className="text-sm font-bold text-zinc-500">{company}</p>
        )}

        {typeof jobTitle === "string" && (
          <p className="text-lg font-bold text-zinc-700">{jobTitle}</p>
        )}

        {typeof comp === "string" && (
          <p className="text-sm font-bold text-zinc-500">{comp}</p>
        )}
      </div>
      <KeywordsFound description={jobDescription ?? undefined} />
    </div>
  );
};

export default Job;
