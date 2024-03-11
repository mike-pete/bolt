"use client";
import { IconArrowRight, IconX } from "@tabler/icons-react";
import JobCard from "~/app/_components/JobCard/JobCard";
import { api } from "~/trpc/react";
import bi from "../_interactions/bi";
import KeywordsFound from "./KeywordsFound";
import useGetJobDetails, { JobDetailError } from "./useGetJobDetails";

const Job: React.FC = () => {
  const { isLoading, jobDetails, error } = useGetJobDetails();

  const { data: keywordGroups, isLoading: loadingKeywordGroups } =
    api.keywords.getKeywordGroups.useQuery();

  if (!isLoading && error === JobDetailError.NO_JOB_ID) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
        <p className="text-3xl font-bold text-zinc-600">Oh no...</p>
        <p>
          It looks like this page {"isn't"} currently supported. If you think it
          should be, please let me know!
        </p>
        <a
          className="font-semibold text-blue-600"
          href="mailto:mike@boltapply.com"
        >
          mike@boltapply.com
        </a>
        <div className="flex flex-grow items-center justify-center">
          <button
            className="flex gap-2 rounded-lg bg-sky-400 px-3 py-2 font-semibold text-white"
            onClick={() => bi.goToPage("https://linkedin.com/jobs/search/")}
          >
            Back to LinkedIn Jobs <IconArrowRight />
          </button>
        </div>
        <p className="text-zinc-400">
          Tip: In the meantime, you can click the <IconX className="inline" />{" "}
          icon in the top right corner to hide the extension for now.
        </p>
      </div>
    );
  }

  // TODO: this should be initialized in onboarding, this should be removed once that is implemented
  if (!loadingKeywordGroups && !keywordGroups?.length) {
    return (
      <div className="flex flex-col gap-4 p-4">
        <p className="text-center text-2xl font-semibold">Getting Started</p>
        <div className="rounded border p-2">
          <p className="text-lg font-semibold">Step 1</p>
          <p>
            Head to the keywords tab and add the keywords you usually look for
            in a job description.
          </p>
        </div>
        <div className="rounded border p-2">
          <p className="text-lg font-semibold">Step 2</p>
          <p>
            Come back to the job tab to see how many times those keywords were
            found in the description.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col gap-2 p-4">
      <JobCard isLoading={isLoading} jobDetails={jobDetails} error={error}/>
      <KeywordsFound description={jobDetails?.description} />
    </div>
  );
};

export default Job;
