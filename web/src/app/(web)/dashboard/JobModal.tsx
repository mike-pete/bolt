import { Dialog } from "@headlessui/react";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import TextArea from "~/app/_components/TextArea/TextArea";
import { api } from "~/trpc/react";

const JobModal: React.FC<{
  open: boolean;
  onClose: () => void;
  notes?: { id: string; note: string; createdAt: Date }[];
}> = ({ open, onClose, notes }) => {
  const [val, setVal] = useState("");

  const ctx = api.useUtils();
  const utils = api.useUtils();

  const createNote = () => {

  }

  return (
    <Dialog
      as="div"
      open={open}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-400/40 p-4 backdrop-blur-sm"
    >
      <Dialog.Panel className="relative flex max-h-full max-w-full flex-col overflow-auto rounded-lg bg-white shadow-lg">
        <TextArea
          value={val}
          setValue={setVal}
          placeholder="new note..."
          className="min-h-[25ch] w-[45ch] max-w-full flex-grow resize-none rounded-t-lg p-8 pb-4 outline-none"
        />
        <div className="flex justify-end gap-2 border-b-2 p-4 pt-0">
          <button className="rounded-lg bg-sky-400 px-2 py-1 text-sm font-semibold uppercase text-white" onClick={createNote}>
            SAVE
          </button>
        </div>
        <div className="flex flex-col gap-2 rounded-b-lg bg-zinc-50 p-4">
          {!notes?.length && (
            <p className="flex justify-center rounded-lg p-4 text-sm font-semibold uppercase text-zinc-400">
              No saved notes
            </p>
          )}
          {notes?.map(({ id, note, createdAt }) => (
            <div className="rounded-lg border-2 bg-white p-4" key={id}>
              {createdAt.toString()}
              {note}
            </div>
          ))}
        </div>
        <button
          className="absolute right-2 top-2 rounded-lg"
          onClick={onClose}
        >
          <IconX
            size={20}
            className="text-zinc-400 transition hover:text-zinc-800"
          />
        </button>
      </Dialog.Panel>
    </Dialog>
  );
};

export default JobModal;
