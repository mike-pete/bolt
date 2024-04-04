import {type PageContext } from "./pageContext";

const linkedinJobSearchContext: PageContext = {
    jobId: {
      mutate: (location?: string): string | undefined | null => {
        let jobId: undefined | string | null = undefined;
  
        if (location) {
          const params = new URL(location).searchParams;
          jobId = params.get("currentJobId") ?? null;
        }
  
        return jobId;
      },
    },
    title: { selector: ".job-details-jobs-unified-top-card__job-title" },
    description: { selector: ".jobs-description--reformatted" },
    company: {
      selector:
        ".job-details-jobs-unified-top-card__primary-description-without-tagline",
      mutate: (scrapedText: string) => {
        if (scrapedText.includes("·")) {
          return (scrapedText.split("·")[0] ?? "").trim();
        }
        return null;
      },
    },
    compensation: {
      selector: ".job-details-jobs-unified-top-card__job-insight > span > span",
      mutate: (scrapedText: string) => {
        if (scrapedText.includes("$")) {
          return scrapedText;
        }
        return null;
      },
    },
    workMode: {
      selector: '.job-details-jobs-unified-top-card__job-insight--highlight > span > span > span > span',
    }
  };

export default linkedinJobSearchContext;