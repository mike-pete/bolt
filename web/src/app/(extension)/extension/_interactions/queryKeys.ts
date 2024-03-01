export const jobKeys = {
  all: ["job"] as const,
  jobId: () => [...jobKeys.all, "jobId"] as const,
  title: () => [...jobKeys.all, "title"] as const,
  description: () => [...jobKeys.all, "description"] as const,
  company: () => [...jobKeys.all, "company"] as const,
  comp: () => [...jobKeys.all, "comp"] as const,
  workModel: () => [...jobKeys.all, "workModel"] as const,
};
