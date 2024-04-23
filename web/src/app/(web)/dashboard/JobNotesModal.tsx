import { Status } from ".prisma/client";
import { Dialog } from "@headlessui/react";
import { IconX } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useRef, useState } from "react";
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
      // TODO: optimistic update job/jobs
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
      note: val.trim(),
    });
  };

  const initialFocusRef = useRef(null);

  return (
    <Dialog
      as="div"
      open={open}
      onClose={onClose}
      className="fixed inset-0 z-40 flex items-center justify-center bg-zinc-400/40 p-4 backdrop-blur-sm"
      initialFocus={initialFocusRef}
    >
      <Dialog.Panel className="max-h-[95vh] w-[45ch] max-w-full overflow-hidden rounded-lg bg-zinc-50 shadow-lg">
        <div className="flex w-full justify-end border-b-2 bg-white p-1">
          <button className="z-50 rounded-lg" onClick={onClose}>
            <IconX
              size={20}
              className="text-zinc-400 transition hover:text-zinc-800"
            />
          </button>
        </div>
        <div className="relative flex max-h-[inherit] min-h-[60ch] max-w-full flex-col overflow-y-auto overflow-x-hidden">
          <div className="flex flex-grow flex-col p-4 pb-0 gap-4">

              <div className="flex w-full flex-col items-end rounded-lg border-2 bg-white p-4">
                <div className="max-h-[30vh] w-full flex-grow overflow-hidden rounded-lg bg-white">
                  <TextArea
                    value={val}
                    setValue={setVal}
                    placeholder="new note..."
                    className="max-h-[inherit] w-full resize-none overflow-y-auto rounded-lg outline-none"
                    ref={initialFocusRef}
                  />
                </div>
                <button
                  className="rounded-lg bg-sky-400 px-2 py-1 text-sm font-semibold uppercase text-white"
                  onClick={createNote}
                  disabled={saveJob.isLoading || val.trim() === ''}
                >
                  {saveJob.isLoading ? "Saving..." : "Save"}
                </button>
              </div>

              <div className="flex flex-grow flex-col gap-2 overflow-auto rounded-b-lg">
                {!notes?.length && (
                  <p className="flex justify-center rounded-lg p-4 text-sm font-semibold uppercase text-zinc-400">
                    No saved notes
                  </p>
                )}
                {notes?.map(({ id, note, createdAt }) => (
                  <div className="flex flex-col gap-1 rounded-lg p-4" key={id}>
                    <p className="text-xs font-semibold text-zinc-400">
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
            </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default JobNotesModal;
