import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { api } from "~/trpc/react";
import type { KeywordGroupType } from "./KeywordGroup";

type Keywords = KeywordGroupType["keywords"];

const KeywordGroupKeywords: React.FC<{
  keywordGroupId: string;
  keywords: Keywords;
}> = ({ keywordGroupId, keywords }) => {
  const [keyword, setKeyword] = useState("");
  const ctx = api.useUtils();

  const { mutate: createKeyword } = api.keywords.createKeyword.useMutation({
    onSettled: () => {
      void ctx.keywords.getKeywordGroups.invalidate();
    },
  });

  const { mutate: deleteKeyword } = api.keywords.deleteKeyword.useMutation({
    onSettled: () => {
      void ctx.keywords.getKeywordGroups.invalidate();
    },
  });

  const submitKeyword = () => {
    if (keyword.trim().length > 0) {
      setKeyword("");
      createKeyword({ keywordGroupId, keyword: keyword.trim().toLowerCase() });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    if (["Enter", ","].includes(key)) {
      e.preventDefault();
      submitKeyword();
    }
  };

  return (
    <div className="flex flex-wrap gap-2 overflow-clip rounded-lg border-2 border-zinc-300 p-2">
      {keywords?.map(({ keyword, id }) => (
        <div
          key={id}
          className={`group relative select-none overflow-clip rounded-full bg-sky-400 px-3 py-1.5 text-sm font-semibold uppercase text-white`}
        >
          <button
            onClick={() => deleteKeyword(id)}
            className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-transparent text-lg text-transparent transition hover:bg-red-900/90 hover:text-white"
          >
            <IconTrash size={20} />
          </button>
          {keyword}
        </div>
      ))}
      <input
        type="text"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        onKeyDown={handleKeyDown}
        onBlur={submitKeyword}
        placeholder="ADD KEYWORDS"
        className="w-[120px] flex-grow bg-transparent text-sm font-semibold uppercase text-zinc-600 outline-none"
      />
    </div>
  );
};

export default KeywordGroupKeywords;
