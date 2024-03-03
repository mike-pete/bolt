import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import SavedJobs from "../../_components/SavedJobs";

const Dashboard = async () => {
  noStore();
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/api/auth/signin");
  }

  return (
    <div className="flex flex-grow flex-col items-center bg-zinc-50 p-8">
      <SavedJobs />
    </div>
  );
};

export default Dashboard;
