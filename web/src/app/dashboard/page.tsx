import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

const Dashboard = async () => {
  noStore();
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/api/auth/signin");
  }

  return redirect("https://www.linkedin.com/jobs/search/");

  // return (
  //   <div className="flex min-h-screen flex-col">
  //     <NavBar />
  //     <div className="flex flex-grow flex-col items-center justify-center">
  //     </div>
  //   </div>
  // );
};

export default Dashboard;
