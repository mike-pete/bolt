"use client";

import { type RouterOutputs } from "~/trpc/shared";
import KeywordGroupHeader from "./KeywordGroupHeader";
import KeywordGroupKeywords from "./KeywordGroupKeywords";

export type KeywordGroup =
  RouterOutputs["keywords"]["getKeywordGroups"][number];

const KeywordGroup: React.FC<{ keywordGroup: KeywordGroup }> = ({
  keywordGroup,
}) => {
  const { keywords } = keywordGroup;

  return (
    <div className="flex w-full flex-col flex-nowrap gap-0.5">
      <KeywordGroupHeader keywordGroup={keywordGroup} />
      <KeywordGroupKeywords keywordGroupId={keywordGroup.id} keywords={keywords} />
    </div>
  );
};

export default KeywordGroup;
