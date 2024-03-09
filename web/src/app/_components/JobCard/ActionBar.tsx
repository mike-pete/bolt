import { Listbox } from "@headlessui/react";
import { IconChevronDown } from "@tabler/icons-react";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { type JobDetails } from "./JobCard";

const ActionBar: React.FC<{ details: JobDetails }> = ({ details }) => {
  return (
    <div className="flex w-full flex-row gap-2 border-t-2 px-4 py-2">
      <StatusPicker details={details} />
    </div>
  );
};

export enum StatusValues {
  Saved = "Saved",
  Applied = "Applied",
  Interviewing = "Interviewing",
  Rejected = "Rejected",
  Offer = "Offer",
  Archived = "Archived",
}
const StatusPicker: React.FC<{ details: JobDetails }> = ({ details }) => {
  const options: Record<StatusValues, string> = {
    [StatusValues.Saved]: "Saved",
    [StatusValues.Applied]: "Applied",
    [StatusValues.Interviewing]: "Interviewing",
    [StatusValues.Rejected]: "Rejected",
    [StatusValues.Offer]: "Offer",
    [StatusValues.Archived]: "Archived",
  };

  const [status, setStatus] = useState<StatusValues>();
  console.log("status", details.status);

  return (
    <div>
      <Listbox value={status} onChange={setStatus}>
        <Listbox.Button className="relative flex items-center gap-1 rounded-lg bg-zinc-200 py-1.5 pl-3 pr-2 text-left text-sm font-semibold text-zinc-700 focus:outline-none">
          {status ? options[status] : "No Status"}
          <IconChevronDown stroke={2.5} size={20} className="text-zinc-500" />
        </Listbox.Button>
        <Listbox.Options className="absolute mt-1 flex flex-col gap-1 overflow-auto rounded-lg bg-white p-1 text-base shadow-lg outline-none">
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
