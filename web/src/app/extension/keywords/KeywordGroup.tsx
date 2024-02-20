"use client";

import { type RouterOutputs } from "~/trpc/shared";
import KeywordGroupHeader from "./KeywordGroupHeader";
import KeywordGroupKeywords from "./KeywordGroupKeywords";

export type KeywordGroupType =
  RouterOutputs["keywords"]["getKeywordGroups"][number];

const KeywordGroup: React.FC<{ keywordGroup: KeywordGroupType }> = ({
  keywordGroup,
}) => {
  const { keywords } = keywordGroup;

  return (
    <div className="group flex w-full flex-col flex-nowrap gap-0.5">
      <KeywordGroupHeader keywordGroup={keywordGroup} />
      <KeywordGroupKeywords
        keywordGroupId={keywordGroup.id}
        keywords={keywords}
      />
    </div>
  );
};

export default KeywordGroup;
