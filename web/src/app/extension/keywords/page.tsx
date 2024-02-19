"use client";

import { api } from "~/trpc/react";

import LoadingSpinner from "~/app/_components/LoadingSpinner";
import KeywordGroup from "./KeywordGroup";
import NewKeywordGroupButton from "./NewKeywordGroupButton";

const Keywords: React.FC = () => {
  const { data: keywordGroups, isLoading: loadingKeywordGroups } =
    api.keywords.getKeywordGroups.useQuery();
  return (
    <div className="flex flex-col flex-nowrap gap-4 items-center p-4">
      {loadingKeywordGroups && <LoadingSpinner />}
      {keywordGroups?.map((keywordGroup) => (
        <KeywordGroup keywordGroup={keywordGroup} key={keywordGroup.id} />
      ))}
      {keywordGroups?.length === 0 && <NoKeywordGroups />}
      <NewKeywordGroupButton />
    </div>
  );
};

const NoKeywordGroups = () => (
  <div className="flex h-full flex-col items-center justify-center gap-1 rounded-lg pt-8 pb-4 text-center">
      <h3 className="w-full text-lg font-semibold">
          What do you want to know?
      </h3>
      <p className="pb-2">
          Add keywords to see what each job offers at a glance.
      </p>
  </div>
)

export default Keywords;
