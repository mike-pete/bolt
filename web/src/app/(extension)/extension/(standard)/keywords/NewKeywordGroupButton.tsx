import { IconPlus } from "@tabler/icons-react";
import LoadingSpinner from "~/app/_components/LoadingSpinner";
import { api } from "~/trpc/react";

const NewKeywordGroupButton: React.FC = () => {
  const ctx = api.useUtils();

  const { mutate: addKeywordGroup, isLoading } =
    api.keywords.createKeywordGroup.useMutation({
      onSettled: () => {
        void ctx.keywords.getKeywordGroups.invalidate();
      },
    });

  return (
    <button
      className="cursor-pointer rounded-full bg-emerald-400 p-2 text-white transition hover:bg-emerald-500 flex items-center gap-2 pl-4 uppercase font-semibold text-sm"
      onClick={() => addKeywordGroup()}
      disabled={isLoading}
    >
      New Group
      {!isLoading && <IconPlus size={20} />}
      {isLoading && <LoadingSpinner />}
    </button>
  );
};

export default NewKeywordGroupButton;
