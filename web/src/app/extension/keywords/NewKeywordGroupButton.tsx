import { IconPlus } from "@tabler/icons-react";
import { api } from "~/trpc/react";

const NewKeywordGroupButton: React.FC = () => {
  const ctx = api.useUtils();

  const { mutate: addKeywordGroup } =
    api.keywords.createKeywordGroup.useMutation({
      onSettled: () => {
        void ctx.keywords.getKeywordGroups.invalidate();
      },
    });

  return (
    <IconPlus
      size={40}
      className="cursor-pointer rounded-full bg-emerald-400 p-2 font-semibold text-white transition hover:bg-emerald-500"
      onClick={() => addKeywordGroup()}
    />
  );
};

export default NewKeywordGroupButton;
