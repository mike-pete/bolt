import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

const NavBar = async () => {
  noStore();
  const session = await getServerAuthSession();

  if (!session) {
    return null;
  }

  return (
    <div className="sticky top-0 flex border-b-2 px-4">
      <div className="flex items-center gap-2 p-2">
        <Link href="/">
          <p className="text-xl font-semibold">Bolt</p>
        </Link>
        {/* <Link href="/dashboard">
          <p className="rounded-md border bg-zinc-100 px-1 py-0.5 text-xs font-bold text-zinc-700">
            DASHBOARD
          </p>
        </Link> */}
      </div>

      <div className="flex flex-grow items-center justify-end gap-2 p-2 text-sm font-semibold">
        <p className="">{session && <span>{session.user?.name}</span>}</p>
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="rounded-md bg-sky-400 px-2 py-1 uppercase text-white"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div>
    </div>
  );
};
export default NavBar;
