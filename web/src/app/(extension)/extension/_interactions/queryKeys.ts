export const jobKeys = {
  all: ["job"] as const,
  currentURL: () => [...jobKeys.all, "currentURL"] as const,
  title: () => [...jobKeys.all, "title"] as const,
  description: () => [...jobKeys.all, "description"] as const,
  company: () => [...jobKeys.all, "company"] as const,
  comp: () => [...jobKeys.all, "comp"] as const,
  workMode: () => [...jobKeys.all, "workModel"] as const,
  highlightedKeywords: () => [...jobKeys.all, "highlightedKeywords"] as const,
};
