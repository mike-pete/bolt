import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/dist/client/link";
import LoadingSpinner from "~/app/_components/LoadingSpinner";
import { api } from "~/trpc/react";
import { type KeywordGroupType } from "../keywords/KeywordGroup";

const scrapeKeywords = (keywords: string[], description: string) => {
  const keywordsFound: Record<string, number> = {};
  const lowerCaseDescription = description.toLowerCase();

  keywords.forEach((keyword) => {
    if (!(keyword in keywordsFound)) {
      const escapedWord = keyword.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      const regex = new RegExp(`\\b(${escapedWord})((?=[^\\w])|$)`, "gi");
      const matches = lowerCaseDescription.match(regex);
      if (matches) {
        keywordsFound[keyword] = matches.length;
      }
    }
  });

  return keywordsFound;
};

const KeywordsFound: React.FC<{ description: string | undefined }> = ({
  description,
}) => {
  const { data: keywordGroups, isLoading: loadingKeywordGroups } =
    api.keywords.getKeywordGroups.useQuery();

  if (description === undefined) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-1 rounded-lg pb-4 pt-8 text-center">
        <p>Problem getting keywords from description.</p>
      </div>
    );
  }

  const keywordsFound = scrapeKeywords(
    keywordGroups?.flatMap((group) => group.keywords.map((k) => k.keyword)) ??
      [],
    description,
  );

  if (loadingKeywordGroups) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingSpinner size={30} />
      </div>
    );
  }

  return (
    <div className="flex max-w-full flex-grow flex-col gap-6 p-4">
      {keywordGroups?.map((group) => (
        <KeywordGroupPreview
          keywordGroup={group}
          keywordsFound={keywordsFound}
          key={group.id}
        />
      ))}
      {Object.keys(keywordsFound)?.length === 0 && <NoKeywordsFound />}
    </div>
  );
};

const KeywordGroupPreview: React.FC<{
  keywordGroup: KeywordGroupType;
  keywordsFound: Record<string, number>;
}> = ({ keywordGroup: { title, keywords }, keywordsFound }) => {
  const keywordsFoundInGroup: { keyword: string; count: number }[] = [];

  keywords.forEach(({ keyword }) => {
    if (keyword in keywordsFound) {
      keywordsFoundInGroup.push({
        keyword,
        count: keywordsFound[keyword] ?? 0,
      });
    }
  });

  if (keywordsFoundInGroup.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col flex-nowrap gap-2">
      <p className="font-bold uppercase text-zinc-400">{title}</p>
      <div className="flex flex-wrap items-center gap-2">
        {keywordsFoundInGroup.map(({ keyword, count }) => (
          <div
            className={`flex select-none items-center gap-2 rounded-full bg-sky-400 py-1.5 pl-3 pr-1.5 uppercase`}
            key={keyword}
          >
            <p className="text-sm font-semibold text-white">{keyword}</p>
            <p className="m-0 min-w-[16px] rounded-full bg-white px-1 py-0.5 text-center text-xs font-bold text-zinc-700">
              {count}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const NoKeywordsFound = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-8">
      <p className="text-2xl font-bold text-zinc-400">No Keywords Found</p>
      <p className="pb-2 text-center text-base font-bold text-zinc-700">
        Add more keywords to see what this job offers at a glance.{" "}
      </p>
      <Link
        href={"/extension/keywords"}
        className="flex items-center gap-1 rounded-full bg-emerald-400 px-3 py-1.5 text-sm font-semibold uppercase text-white transition hover:bg-emerald-500"
      >
        KEYWORDS <IconArrowRight size={20} />
      </Link>
    </div>
  );
};

export default KeywordsFound;
