"use client";

import { api } from "~/trpc/react";

import LoadingSpinner from "~/app/_components/LoadingSpinner";
import KeywordGroup from "./KeywordGroup";
import NewKeywordGroupButton from "./NewKeywordGroupButton";

const Keywords: React.FC = () => {
  const { data: keywordGroups, isLoading: loadingKeywordGroups } =
    api.keywords.getKeywordGroups.useQuery();

  if (loadingKeywordGroups) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner size={30} />
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col flex-nowrap items-center gap-4 p-4">
      {keywordGroups?.map((keywordGroup) => (
        <KeywordGroup keywordGroup={keywordGroup} key={keywordGroup.id} />
      ))}
      {keywordGroups?.length === 0 && (
        <div className="flex h-full flex-col items-center justify-center gap-1 rounded-lg pb-4 pt-8 text-center">
          <h3 className="w-full text-lg font-semibold">
            What do you want to know?
          </h3>
          <p className="pb-2">
            Add keywords to see what each job offers at a glance.
          </p>
        </div>
      )}
      <NewKeywordGroupButton />
    </div>
  );
};

export default Keywords;
