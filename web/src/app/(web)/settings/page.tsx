import ExportJobs from "./ExportJobs";

const Settings = () => {
  return (
    <div className="flex flex-grow justify-center p-8">
      <div className="prose prose-lg prose-zinc min-w-[50%] rounded-lg border-2 bg-white p-8">
        <h3>Export Jobs</h3>
        <p>You can export your saved jobs as a .csv with the button below:</p>
        <ExportJobs /> <hr />
        {/* <h3>Billing</h3>
        <hr /> */}
      </div>
    </div>
  );
};

export default Settings;
