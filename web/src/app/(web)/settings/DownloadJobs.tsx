"use client";
const DownloadJobs: React.FC<{ csv: string }> = ({ csv }) => {
  return (
    <div>
      <a
        className="rounded-lg bg-blue-400 px-3 py-1 font-semibold text-white no-underline"
        href={csv}
        download={"Jobs.csv"}
      >
        Download CSV
      </a>
    </div>
  );
};
export default DownloadJobs;
