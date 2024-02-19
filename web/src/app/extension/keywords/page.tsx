"use client";

import { api } from "~/trpc/react";

import LoadingSpinner from "~/app/_components/LoadingSpinner";
import KeywordGroup from "./KeywordGroup";
import NewKeywordGroupButton from "./NewKeywordGroupButton";

const Keywords: React.FC = () => {
  const { data: keywordGroups, isLoading: loadingKeywordGroups } =
    api.keywords.getKeywordGroups.useQuery();
  return (
    <div className="flex flex-col flex-nowrap gap-4 items-center">
      {loadingKeywordGroups && <LoadingSpinner />}
      {keywordGroups?.map((keywordGroup) => (
        <KeywordGroup keywordGroup={keywordGroup} key={keywordGroup.id} />
      ))}
      <NewKeywordGroupButton />
    </div>
  );
};

export default Keywords;
