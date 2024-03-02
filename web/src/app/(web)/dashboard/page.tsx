import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import SavedJobs from "./SavedJobs";

const Dashboard = async () => {
  noStore();
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/api/auth/signin");
  }

  return (
    <div className="flex flex-grow flex-col items-center bg-zinc-50">
      <SavedJobs />
    </div>
  );
};

export default Dashboard;
