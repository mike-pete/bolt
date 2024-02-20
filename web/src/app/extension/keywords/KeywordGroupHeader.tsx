"use client";

import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { api } from "~/trpc/react";

import useDebounce from "~/app/_hooks/useDebounce";
import { type KeywordGroupType } from "./KeywordGroup";

const KeywordGroupHeader: React.FC<{ keywordGroup: KeywordGroupType }> = ({
  keywordGroup,
}) => {
  const { id, title } = keywordGroup;
  const ctx = api.useUtils();

  const { mutate: updateKeywordGroup } =
    api.keywords.updateKeywordGroup.useMutation();

  const { mutate: deleteKeywordGroup } =
    api.keywords.deleteKeywordGroup.useMutation({
      onMutate: async ({ keywordGroupId }) => {
        await ctx.keywords.getKeywordGroups.cancel();
        const prevData = ctx.keywords.getKeywordGroups.getData();
        ctx.keywords.getKeywordGroups.setData(
          undefined,
          (prevData) =>
            prevData?.filter((group) => group.id !== keywordGroupId) ?? [],
        );
        return { prevData };
      },
      onError: (error, variables, context) => {
        if (context?.prevData) {
          ctx.keywords.getKeywordGroups.setData(undefined, context.prevData);
        }
      },
      onSettled: () => {
        void ctx.keywords.getKeywordGroups.invalidate();
      },
    });

  const updateTitle = (newTitle: string) => {
    updateKeywordGroup({
      keywordGroupId: id,
      title: newTitle,
    });
  };

  const [titleInput, setTitleInput] = useState(title);

  const titleChangeDebounce = useDebounce((newTitle: string) => {
    updateTitle(newTitle);
  }, 1000);

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newTitle = e.currentTarget.value;
    setTitleInput(newTitle);
    titleChangeDebounce(newTitle);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="string"
        value={titleInput}
        placeholder="NEW KEYWORD GROUP"
        className="min-w-0 flex-grow py-1 pr-2 font-bold uppercase text-zinc-600 outline-none"
        onChange={handleTitleChange}
      />
      <IconTrash
        className="hidden flex-shrink-0 cursor-pointer text-xl text-zinc-300 transition hover:!text-zinc-800 group-hover:block"
        onClick={() => deleteKeywordGroup({ keywordGroupId: id })}
        size={20}
      />
    </div>
  );
};

export default KeywordGroupHeader;
