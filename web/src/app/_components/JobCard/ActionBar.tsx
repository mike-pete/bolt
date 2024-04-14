import { Listbox } from "@headlessui/react";
import { Status } from "@prisma/client";
import { IconChevronDown, IconHeart } from "@tabler/icons-react";
import React, { useRef } from "react";
import { twMerge } from "tailwind-merge";
import { api } from "~/trpc/react";
import { type RouterInputs } from "~/trpc/shared";
import { type JobDetails } from "./JobCard";

const useSaveJob = () => {
  const utils = api.useUtils();
  const mutationCount = useRef(0);

  const saveJob = api.jobs.saveJob.useMutation({
    onMutate: async (jobDetails) => {
      await utils.jobs.getJob.cancel();
      await utils.jobs.getJobs.cancel();
      const prevData = {
        job: utils.jobs.getJob.getData(jobDetails.jobId),
        jobs: utils.jobs.getJobs.getData(),
      };
      utils.jobs.getJob.setData(jobDetails.jobId, {
        ...jobDetails,
        status: jobDetails?.status ?? Status.Saved,
        compensation: jobDetails?.compensation ?? null,
        createdAt: prevData?.job?.createdAt ?? new Date(),
        notes: prevData?.job?.notes ?? [],
      });
      utils.jobs.getJobs.setData(undefined, (prev) => {
        return prev?.map((job) => {
          if (job.jobId === jobDetails.jobId) {
            return {
              ...job,
              ...jobDetails,
            };
          }
          return job;
        });
      });
      return { prevData };
    },
    onError(err, jobDetails, ctx) {
      utils.jobs.getJob.setData(jobDetails.jobId, ctx?.prevData.job);
      utils.jobs.getJobs.setData(undefined, ctx?.prevData.jobs);
    },
    onSettled: () => {
      mutationCount.current -= 1;
      if (mutationCount.current === 0) {
        void utils.jobs.getJob.invalidate();
        void utils.jobs.getJobs.invalidate();
      }
    },
  });

  return (details: JobDetails) => {
    const newJobData: RouterInputs["jobs"]["saveJob"] = {
      ...details,
      compensation: details?.compensation ?? undefined,
      status: details?.status ?? Status.Saved,
    };
    saveJob.mutate(newJobData);
  };
};

const ActionBar: React.FC<{ details: JobDetails }> = ({ details }) => {
  return (
    <div className="flex w-full flex-row items-center gap-2 border-t-2 border-t-inherit px-4 py-2 bg-white/70 rounded-b-md">
      <StatusPicker details={details} />
      <FavoriteButton details={details} />
    </div>
  );
};

const options: Record<
  Status,
  { label: string; style: { primary: string; secondary: string } }
> = {
  [Status.Saved]: {
    label: "Saved",
    style: {
      primary: "bg-zinc-500/70 text-white",
      secondary: "bg-zinc-100 text-zinc-700",
    },
  },
  [Status.Applied]: {
    label: "Applied",
    style: {
      primary: "bg-indigo-500/70 text-white",
      secondary: "bg-indigo-100 text-zinc-700",
    },
  },
  [Status.Interviewing]: {
    label: "Interviewing",
    style: {
      primary: "bg-emerald-500/70 text-white",
      secondary: "bg-emerald-100 text-zinc-700",
    },
  },
  [Status.Offer]: {
    label: "Offer",
    style: {
      primary: "bg-violet-500/70 text-white",
      secondary: "bg-violet-100 text-zinc-700",
    },
  },
  [Status.Rejected]: {
    label: "Rejected",
    style: {
      primary: "bg-red-500/70 text-white",
      secondary: "bg-red-100 text-zinc-700",
    },
  },
  [Status.Archived]: {
    label: "Archived",
    style: {
      primary: "bg-orange-500/70 text-white",
      secondary: "bg-orange-100 text-zinc-700",
    },
  },
};

const StatusPicker: React.FC<{ details: JobDetails }> = ({ details }) => {
  const saveJob = useSaveJob();

  const { label, style } = details?.status
    ? options[details.status]
    : { label: "Set Status", style: { primary: "", secondary: "" } };

  return (
    <div className="relative">
      <Listbox
        value={details?.status}
        onChange={(newStatus) => {
          saveJob({
            ...details,
            status: newStatus,
          });
        }}
      >
        <Listbox.Button
          className={twMerge(
            "relative flex items-center gap-1 rounded-lg bg-zinc-200 py-1.5 pl-3 pr-2 text-left text-xs font-bold uppercase text-zinc-700 focus:outline-none",
            style.primary,
          )}
        >
          {label}
          <IconChevronDown stroke={2.5} size={20} />
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 mt-1 flex flex-col gap-1 overflow-auto rounded-lg border-2 bg-white p-1 text-base shadow-lg outline-none">
          {Object.entries(options).map(([value, { label, style }]) => (
            <Listbox.Option
              key={value}
              value={value}
              className={({ active, selected }) =>
                twMerge(
                  "cursor-pointer select-none truncate rounded-lg px-3 py-1.5 text-xs font-bold uppercase text-zinc-700 transition",

                  selected && style.primary,
                  active && style.secondary,
                )
              }
            >
              {label}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

const FavoriteButton: React.FC<{ details: JobDetails }> = ({ details }) => {
  const saveJob = useSaveJob();

  return (
    <button
    data-ph-capture-attribute-user-clicked-favorite={details.favoritedAt ? "unfavorited" : "favorited"}
      onClick={() =>
        
        saveJob({
          ...details,
          favoritedAt: details.favoritedAt ? null : new Date(),
        })
      }
    >
      <IconHeart
        className={twMerge(
          "transition-duration-150 fill-zinc-200 text-zinc-400 transition",
          details.favoritedAt && "fill-red-400 text-red-600",
        )}
        stroke={2}
      />
    </button>
  );
};

export default ActionBar;
