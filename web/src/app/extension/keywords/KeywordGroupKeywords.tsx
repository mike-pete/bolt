import type { KeywordGroup } from "./KeywordGroup";

type Keywords = KeywordGroup["keywords"];

const KeywordGroupKeywords: React.FC<{ keywords: Keywords }> = ({
  keywords,
}) => {
  return (
    <div className="flex flex-wrap gap-2 overflow-clip rounded-lg border-2 border-zinc-300 p-2">
      {keywords?.map((keyword) => (
        <div key={keyword.id}>
          <p>{keyword.keyword}</p>
        </div>
      ))}
      <input
        type="text"
        //   onKeyDown={handleKeyDown}
        //   onBlur={handleBlur}
        placeholder="ADD KEYWORDS"
        className="w-[120px] flex-grow bg-transparent text-sm font-semibold uppercase text-zinc-600 outline-none"
      />
    </div>
  );
};

export default KeywordGroupKeywords;
