import { IconArrowRight } from "@tabler/icons-react";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import NavBar from "../_components/NavBar";

const Dashboard = async () => {
  noStore();
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/api/auth/signin");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <div className="flex flex-grow flex-col items-center justify-center">
        <div className="rounded-lg border bg-zinc-100 p-5">
          <h1>Welcome!</h1>

          <a
            
            href="https://www.linkedin.com/jobs/search/"
            className="block flex items-center gap-2 rounded-lg bg-sky-400 p-2 font-semibold uppercase text-white"
          >
            Get Started <IconArrowRight size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
