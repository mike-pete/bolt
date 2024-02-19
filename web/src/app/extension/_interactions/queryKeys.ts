export const jobKeys = {
  all: ["job"] as const,
  jobId: () => [...jobKeys.all, "jobId"] as const,
  title: () => [...jobKeys.all, "title"] as const,
  // description: () => [...jobKeys.all, "description"] as const,
  // company: () => [...jobKeys.all, "company"] as const,
  // salary: () => [...jobKeys.all, "salary"] as const,
};
