import dayjs from "dayjs";
import { api } from "~/trpc/server";
import DownloadJobs from "./DownloadJobs";

const ExportJobs = async () => {
  const jobs = await api.jobs.getJobs.query();

  const csvData = [["Title", "Company", "Compensation", "Status", "Saved on"]];
  jobs.forEach((job) => {
    csvData.push([
      job.title,
      job.company,
      job?.compensation ?? "",
      job?.status[0]?.status ?? "",
      dayjs(job.createdAt).format("DD/MM/YYYY"),
    ]);
  });

  const csv =
    "data:text/csv;charset=utf-8," +
    csvData.map((e) => e.map((x) => `"${x}"`).join(",")).join("\n");

  return <DownloadJobs csv={csv} />;
};

export default ExportJobs;
