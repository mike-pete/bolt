import { Status } from ".prisma/client";
import { Dialog } from "@headlessui/react";
import dayjs from "dayjs";
import { useState } from "react";
import { type JobDetails } from "~/app/_components/JobCard/JobCard";
import TextArea from "~/app/_components/TextArea/TextArea";
import { api } from "~/trpc/react";

const JobNotesModal: React.FC<{
  open: boolean;
  onClose: () => void;
  isLoadingJobDetails: boolean;
  jobDetails?: JobDetails;
}> = ({ open, onClose, jobDetails }) => {
  const [val, setVal] = useState("");

  const utils = api.useUtils();

  const saveJob = api.jobs.saveJob.useMutation({
    onSuccess: () => {
      setVal("");
    },
    onSettled: () => {
      void utils.jobs.getJob.invalidate();
      void utils.jobs.getJobs.invalidate();
    },
  });

  const notes = jobDetails?.notes ?? [];

  const createNote = () => {
    if (!jobDetails) return;
    saveJob.mutate({
      ...jobDetails,
      status: jobDetails?.status ?? Status.Saved,
      compensation: jobDetails?.compensation ?? undefined,
      note: val,
    });
  };

  return (
    <Dialog
      as="div"
      open={open}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-400/40 p-4 backdrop-blur-sm"
    >
      <Dialog.Panel className="max-h-[95vh] w-[50ch] max-w-full overflow-hidden rounded-lg bg-zinc-50 shadow-lg">
        <div className="relative flex max-h-[inherit] min-h-[45ch] max-w-full flex-col overflow-y-auto overflow-x-hidden">
          <div className="flex flex-grow flex-col">
            <div className="flex flex-col w-full items-end gap-4 z-10 border-b-2 p-4 bg-white">
              <div className="max-h-[30vh] w-full flex-grow overflow-hidden rounded-lg bg-white">
                <TextArea
                  value={val}
                  setValue={setVal}
                  placeholder="new note..."
                  className="max-h-[inherit] w-full resize-none overflow-y-auto rounded-lg p-4 outline-none"
                />
              </div>
              <button
                className="rounded-lg bg-sky-400 px-2 py-1 text-sm font-semibold uppercase text-white"
                onClick={createNote}
              >
                SAVE
              </button>
            </div>

            <div className="flex max-h-[50vh] flex-grow flex-col gap-2 overflow-auto rounded-b-lg p-4">
              {!notes?.length && (
                <p className="flex justify-center rounded-lg p-4 text-sm font-semibold uppercase text-zinc-400">
                  No saved notes
                </p>
              )}
              {notes?.map(({ id, note, createdAt }) => (
                <div
                  className="flex flex-col gap-1 rounded-lg p-4"
                  key={id}
                >
                  <p className="text-xs text-zinc-400 font-semibold">
                    {dayjs(createdAt).format("MMMM DD, YYYY")}
                  </p>
                  <TextArea
                    value={note}
                    setValue={() => {
                      return;
                    }}
                    className="w-full resize-none bg-transparent"
                    disabled
                  />
                </div>
              ))}
            </div>
            {/* <button
              className="absolute right-2 top-2 rounded-lg"
              onClick={onClose}
            >
              <IconX
                size={20}
                className="text-zinc-400 transition hover:text-zinc-800"
              />
            </button> */}
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default JobNotesModal;
