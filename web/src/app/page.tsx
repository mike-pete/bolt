import { IconBrandChrome, IconBrandDiscordFilled } from "@tabler/icons-react";
import Image from "next/image";
import BuyWithStripe from "./_components/BuyWithStripe";
import NavBar from "./_components/NavBar";

export default async function Home() {
  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center overflow-x-hidden">
        <div className="flex flex-col items-center gap-8">
          <section className="flex h-screen shrink-0 flex-col p-8">
            <div className="flex h-4/6 flex-col items-center justify-center">
              <div className="flex items-center gap-4">
                <Image src="/bolt.svg" alt="Bolt" width={40} height={40} />
                <h1 className="text-7xl font-semibold">Bolt</h1>
              </div>
              <h3 className="text-lg font-black uppercase tracking-wider text-zinc-500">
                Early Access
              </h3>
            </div>

            <div className="flex flex-col items-start gap-2">
              <BuyWithStripe />
              <a
                className="flex gap-2 rounded-lg bg-zinc-200 p-2 text-lg font-semibold"
                href="https://chromewebstore.google.com/detail/bolt-apply/iieomcnmomejdefhjfdljckabjldeenb?hl=en&authuser=0"
                target="_blank"
              >
                Chrome Store
                <IconBrandChrome />
              </a>
              <a
                className="flex gap-2 rounded-lg bg-zinc-200 p-2 text-lg font-semibold"
                href="https://discord.gg/gBB8uVarFn"
                target="_blank"
              >
                Discord
                <IconBrandDiscordFilled />
              </a>
            </div>
          </section>

          <section className="w-screen bg-[url('/jobDesc.png')] bg-cover bg-fixed">
            <div className="flex h-[50vh] items-center justify-center bg-white bg-opacity-70 backdrop-blur-sm">
              <p className="w-4/5 max-w-3xl text-center  text-2xl font-bold md:text-5xl">
                Get an instant overview for each job on LinkedIn.
              </p>
            </div>
          </section>

          <section className="flex flex-wrap justify-center gap-4 px-4">
            <div>
              <p className="rounded-xl bg-zinc-600 px-6 py-4 text-center text-lg font-semibold text-white sm:text-xl">
                Tell us what {"you're"} looking for...
              </p>
              <div className="px-8 py-10">
                <Image
                  src="/keywords.png"
                  alt="keywords"
                  width={354}
                  height={469}
                  className="rounded-lg py-4 shadow-[0px_0px_30px_10px] shadow-sky-300"
                />
              </div>
            </div>

            <div>
              <p className="rounded-xl bg-zinc-600 px-6 py-4 text-center text-lg font-semibold text-white sm:text-xl">
                ...and {"we'll"} tell you if they have it!
              </p>
              <div className="px-8 py-10">
                <Image
                  src="/job.png"
                  alt="keywords"
                  width={354}
                  height={410.6}
                  className="rounded-lg shadow-[0px_0px_30px_10px] shadow-sky-300"
                />
              </div>
            </div>
          </section>
          {/* <section className="h-screen p-8"></section> */}
        </div>
      </div>
    </div>
  );
}
