import { IconAlertTriangleFilled } from "@tabler/icons-react";
import React from "react";
import { type JobDetails } from "./JobCard";

const JobOverview: React.FC<{ details: JobDetails }> = ({ details }) => {
  const { company, title, compensation, workMode } = details;
  return (
    <>
      <p className="text-sm font-bold text-zinc-500">{company}</p>
      {details?.url ? (
        <a
          href={details.url}
          target="_blank"
          title="Go to job"
          className="text-lg font-bold text-sky-600 transition hover:text-sky-400"
        >
          {title}
        </a>
      ) : (
        <p className="text-lg font-bold text-zinc-700">{title}</p>
      )}
      {compensation && <p className="text-sm font-bold text-zinc-500">{compensation}</p>}
      {(typeof workMode?.declared === "string" ||
        workMode?.conflicting?.length) && (
        <div className="flex flex-wrap items-start gap-2">
          {typeof workMode.declared === "string" && (
            <p className="flex-shrink-0 rounded bg-zinc-400 px-1.5 py-0.5 text-xs font-bold uppercase text-zinc-100">
              {workMode.declared}
            </p>
          )}
          {Boolean(workMode?.conflicting?.length) && (
            <div className="flex flex-wrap gap-1 rounded outline-dashed  outline-2 outline-offset-1 outline-zinc-300">
              <p className="px-1.5 py-0.5 text-xs font-bold uppercase text-zinc-500">
                {typeof workMode?.declared === "string" && (
                  <>
                    <IconAlertTriangleFilled
                      className="inline text-amber-500"
                      size={16}
                    />{" "}
                  </>
                )}
                found: {workMode.conflicting?.join(", ")}
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default JobOverview;
