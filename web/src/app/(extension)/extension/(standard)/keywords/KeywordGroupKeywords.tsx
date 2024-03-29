import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import LoadingSpinner from "~/app/_components/LoadingSpinner";
import { api } from "~/trpc/react";
import type { KeywordGroupType } from "./KeywordGroup";

type Keywords = KeywordGroupType["keywords"];

const KeywordGroupKeywords: React.FC<{
  keywordGroupId: string;
  keywords: Keywords;
}> = ({ keywordGroupId, keywords }) => {
  const utils = api.useUtils();
  const [keyword, setKeyword] = useState("");
  const ctx = api.useUtils();

  const { mutate: createKeyword } = api.keywords.createKeyword.useMutation({
    onMutate: async ({ keyword, keywordGroupId }) => {
      await utils.keywords.getKeywordGroups.cancel();
      const prevData = utils.keywords.getKeywordGroups.getData();
      utils.keywords.getKeywordGroups.setData(undefined, (prev) => {
        return prev?.map((keywordGroup) => {
          if (keywordGroup.id === keywordGroupId) {
            return {
              ...keywordGroup,
              keywords: [
                ...keywordGroup.keywords,
                {
                  id: `pending${Math.random()}`,
                  keyword,
                  keywordGroupId,
                  userId: "",
                },
              ],
            };
          }
          return keywordGroup;
        });
      });
      return { prevData };
    },
    onError(err, _, ctx) {
      utils.keywords.getKeywordGroups.setData(undefined, ctx?.prevData);
    },
    onSettled: () => {
      void ctx.keywords.getKeywordGroups.invalidate();
    },
  });

  const { mutate: deleteKeyword } = api.keywords.deleteKeyword.useMutation({
    onMutate: async (idToDelete: string) => {
      await utils.keywords.getKeywordGroups.cancel();
      const prevData = utils.keywords.getKeywordGroups.getData();
      utils.keywords.getKeywordGroups.setData(undefined, (prev) => {
        return prev?.map((keywordGroup) => {
          return {
            ...keywordGroup,
            keywords: keywordGroup.keywords.filter(
              ({ id }) => id !== idToDelete,
            ),
          };
        });
      });
      return { prevData };
    },
    onError(err, _, ctx) {
      utils.keywords.getKeywordGroups.setData(undefined, ctx?.prevData);
    },
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
    <div className="flex flex-wrap gap-2 overflow-clip rounded-lg border-2 bg-white p-2">
      {keywords?.map(({ keyword, id, }) => {
        const pending = id.startsWith("pending");
        return (
          <div
            key={id}
            className={`group relative select-none overflow-clip rounded-full bg-sky-400 px-3 py-1.5 text-sm font-semibold uppercase text-white`}
          >
            <button
              disabled={pending}
              onClick={() => deleteKeyword(id)}
              className="absolute left-0 top-0 flex h-full w-full items-center justify-center text-lg opacity-0 transition hover:bg-red-900/90 hover:text-white hover:opacity-100 disabled:cursor-progress"
            >
              {pending && <LoadingSpinner size={20} />}
              {!pending && <IconTrash size={20} />}
            </button>
            {keyword}
          </div>
        );
      })}
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
