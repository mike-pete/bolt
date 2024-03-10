import { Listbox } from "@headlessui/react";
import { Status } from "@prisma/client";
import { IconChevronDown, IconExternalLink } from "@tabler/icons-react";
import React from "react";
import { twMerge } from "tailwind-merge";
import { api } from "~/trpc/react";
import { type JobDetails } from "./JobCard";

const ActionBar: React.FC<{ details: JobDetails }> = ({ details }) => {
  return (
    <div className="flex w-full flex-row gap-2 border-t-2 px-4 py-2 items-center">
      <StatusPicker details={details} />
      {details?.url && <a
          href={details.url}
          target="_blank"
          title="Go to job"
          className="text-zinc-500"
        >
          <IconExternalLink />
        </a>}
    </div>
  );
};

const StatusPicker: React.FC<{ details: JobDetails }> = ({ details }) => {
  const options: Record<Status, string> = {
    [Status.Saved]: "Saved",
    [Status.Applied]: "Applied",
    [Status.Interviewing]: "Interviewing",
    [Status.Rejected]: "Rejected",
    [Status.Offer]: "Offer",
    [Status.Archived]: "Archived",
  };

  const ctx = api.useUtils();

  const saveJob = api.jobs.saveJob.useMutation({
    // todo: implement optimistic updates
    onSuccess: () => {
      void ctx.jobs.getJob.invalidate();
      void ctx.jobs.getJobs.invalidate();
    },
  });

  return (
    <div className="relative">
      <Listbox
        value={details?.status}
        onChange={(newStatus) => {
          console.log("updated");
          saveJob.mutate({ ...details, status: newStatus });
        }}
      >
        <Listbox.Button className="relative flex items-center gap-1 rounded-lg bg-zinc-200 py-1.5 pl-3 pr-2 text-left text-sm font-semibold text-zinc-700 focus:outline-none">
          {details?.status ? options[details.status] : "No Status"}
          <IconChevronDown stroke={2.5} size={20} className="text-zinc-500" />
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 mt-1 flex flex-col gap-1 overflow-auto rounded-lg bg-white p-1 text-base shadow-lg outline-none">
          {Object.entries(options).map(([value, label]) => (
            <Listbox.Option
              key={value}
              value={value}
              className={({ active, selected }) =>
                twMerge(
                  "cursor-pointer select-none rounded-lg px-3 py-1.5",
                  active && "bg-zinc-100",
                  selected && "bg-zinc-100",
                )
              }
            >
              <p className="block truncate text-sm">{label}</p>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default ActionBar;
