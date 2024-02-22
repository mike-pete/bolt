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
    <div className="sticky top-0 flex justify-end border-b-2">
      <div className="flex items-center justify-center gap-2 p-2 text-sm font-semibold">
        <p className="">{session && <span>{session.user?.name}</span>}</p>
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="rounded-md bg-sky-400 px-2 py-1 text-white"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div>
    </div>
  );
};
export default NavBar;
