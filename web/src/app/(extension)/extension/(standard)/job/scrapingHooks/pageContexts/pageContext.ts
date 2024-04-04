import linkedinJobSearchContext from "./linkedinJobSearchContext";
import linkedinJobViewContext from "./linkedinJobViewContext";

export type PageContext = {
  jobId: { mutate: (location?: string) => string | undefined | null };
  title: { selector: string };
  description: { selector: string };
  company: {
    selector: string;
    mutate?: (scrapedText: string) => string | undefined | null;
  };
  compensation: {
    selector: string;
    mutate?: (scrapedText: string) => string | undefined | null;
  };
  workMode: {
    selector: string;
    mutate?: (scrapedText: string) => string | undefined | null;
  };
};

export const pageContexts: {
  match: (url: string) => boolean;
  context: PageContext;
}[] = [
  {
    match: (url: string) =>
      url.startsWith("https://www.linkedin.com/jobs/search/"),
    context: linkedinJobSearchContext,
  },
  {
    match: (url: string) =>
      url.startsWith("https://www.linkedin.com/jobs/view/"),
    context: linkedinJobViewContext,
  },
];
