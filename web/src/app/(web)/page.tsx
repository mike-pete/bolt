import {
  IconArrowDown,
  IconBrandChrome,
  IconBrandX,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-col items-center gap-8">
      <section className="flex h-screen shrink-0 flex-col p-8">
        <div className="flex h-2/6 scale-105 flex-col items-center justify-end">
          <div className="flex items-center gap-4">
            <Image src="/bolt.svg" alt="Bolt" width={40} height={40} />
            <h1 className="text-7xl font-semibold">Bolt</h1>
          </div>
          <h3 className="text-lg font-black uppercase tracking-wider text-zinc-500">
            Early Access
          </h3>
        </div>

        <div className="flex h-3/6 flex-col items-center  justify-center gap-3">
          <a
            className="group/try-now flex flex-col items-center justify-center gap-3"
            href="https://chromewebstore.google.com/detail/bolt-apply/iieomcnmomejdefhjfdljckabjldeenb?hl=en&authuser=0"
            target="_blank"
            data-ph-capture-attribute-user-clicked="Chrome Store C2A"
          >
            <p className="text-lg font-bold uppercase text-zinc-500">Try Now</p>
            <IconArrowDown
              size={32}
              stroke={2}
              className="-translate-y-2 transition-all duration-150 group-hover/try-now:translate-y-0"
            />

            <button className="flex items-center gap-2 rounded-lg bg-zinc-700 p-4 text-2xl font-semibold text-zinc-50 transition duration-150 group-hover/try-now:scale-105">
              Chrome Store
              <IconBrandChrome />
            </button>
          </a>
          <a
            className="flex items-center gap-2 rounded-lg bg-zinc-200 p-2 font-semibold transition-all duration-150 hover:scale-105"
            href="https://twitter.com/mik_pete"
            target="_blank"
            data-ph-capture-attribute-user-clicked="Twitter C2A"
          >
            Follow Updates on
            <IconBrandX size={18} />
          </a>
        </div>
      </section>

      <section className="w-full bg-[url('/jobDesc.png')] bg-cover bg-fixed">
        <div className="flex flex-col bg-white bg-opacity-85 backdrop-blur-sm">
          <div className="h-24 w-full bg-gradient-to-b from-zinc-50"></div>

          <div className="flex w-full flex-wrap items-center justify-center">
            <p className="min-w-lg max-w-[80vw] text-center text-[8vw] font-bold leading-tight sm:max-w-lg sm:text-5xl">
              Specify what you look for in a job description
            </p>
            <Image
              src="/keywordsTab.png"
              alt="specify keywords"
              width={708}
              height={1308}
              className="flex-grow scale-75 rounded-lg shadow-2xl shadow-zinc-400 sm:h-[80vh] sm:max-w-[calc(80vh*708/1308)]"
            />
          </div>

          <div className="flex w-full flex-wrap items-center justify-center">
            <p className="min-w-lg max-w-[80vw] text-center text-[8vw] font-bold leading-tight sm:max-w-lg sm:text-5xl">
              Instantly see what the job offers
            </p>
            <Image
              src="/jobTab.png"
              alt="job overview"
              width={708}
              height={1308}
              className="flex-grow scale-75 rounded-lg shadow-2xl shadow-zinc-400 sm:h-[80vh] sm:max-w-[calc(80vh*708/1308)] lg:-order-1"
            />
          </div>

          <div className="flex w-full flex-wrap items-center justify-center flex-col pt-32 gap-8">
            <p className="min-w-lg max-w-[80vw] text-center text-[8vw] font-bold leading-tight sm:text-5xl">
              Save jobs and track your applications
            </p>
            <Image
              src="/grid.png"
              alt="saved jobs"
              width={687}
              height={413}
              className="flex-grow rounded-lg shadow-2xl shadow-zinc-400 w-full max-w-[80vw] sm:max-w-5xl"
            />
          </div>

          <div className="h-24 w-full bg-gradient-to-t from-zinc-50"></div>
        </div>
      </section>

      <section className="flex w-full items-center justify-center p-4">
        <div className="flex w-full max-w-3xl flex-col gap-12 items-center">
          <h1 className="text-5xl font-black text-zinc-600 md:text-6xl">
            DEMO
          </h1>
          <iframe
            className="aspect-video w-full"
            src="https://www.youtube.com/embed/UH-98PfcY7U?si=TgXg_ozVa1QnQ3Tf"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        </div>
      </section>

      <section className="flex flex-col items-center gap-12 py-24">
        <h1 className="text-5xl font-black text-zinc-600 md:text-6xl">
          Pricing
        </h1>

        <div className="flex min-w-80 flex-col gap-4 rounded-2xl border-2 bg-white p-6">
          <div className="p-8 text-center">
            <div className="flex justify-center">
              <p className="text-2xl font-bold">$</p>
              <h3 className="text-5xl font-black">4.99</h3>
            </div>
            <p className="text-xl font-bold text-zinc-400">per month</p>
          </div>
          <hr />
          <div>
            <h3 className="text-lg font-semibold">Features</h3>
            <ul className="list-disc px-4">
              <li>Instant job overviews</li>
              <li>Save jobs for later</li>
              <li>Track applications</li>
            </ul>
          </div>
          <hr />

          <div className="pt-2">
            <a
              className="group/try-now flex flex-col items-center justify-center gap-3"
              href="https://chromewebstore.google.com/detail/bolt-apply/iieomcnmomejdefhjfdljckabjldeenb?hl=en&authuser=0"
              target="_blank"
              data-ph-capture-attribute-user-clicked="Try for Free C2A"
            >
              <p className="rounded-lg bg-emerald-400 px-4 py-3 text-lg font-semibold uppercase text-white">
                Try for free
              </p>
            </a>
            <p className="pt-4 text-center font-semibold text-zinc-500">
              no card needed
            </p>
            <p className="text-center font-semibold text-zinc-500">
              cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* <section className="flex w-full items-center justify-center p-4">
        <div className="flex w-full max-w-3xl flex-col gap-4">
          <h1 className="text-4xl font-black text-zinc-600 md:text-6xl">Q&A</h1>

          <h3 className="text-xl font-semibold">
            How do I cancel my subscription?
          </h3>
          <p className="ml-4 border-l-4 p-3">
            Cancel at any time by sending an email to mike@boltapply.com and{" "}
            {"I'll"} make sure {"it's"} canceled within 24 hrs!
          </p>

          <h3 className="text-xl font-semibold">
            What job boards are supported?
          </h3>
          <p className="ml-4 border-l-4 p-3">
            Currently we only support LinkedIn. But if {"you'd"} like a
            different job board added, definitely let me know!
            mike@boltapply.com
          </p>
        </div>
      </section> */}

      <footer className="flex w-full justify-center gap-8 p-6">
        <Link
          className="text-xs font-semibold uppercase text-zinc-600 hover:text-sky-600"
          href="mailto:mike@boltapply.com"
        >
          mike@boltapply.com
        </Link>
        <Link
          className="text-xs font-semibold uppercase text-zinc-600 hover:text-sky-600"
          href="https://boltapply.com/privacy.txt"
        >
          Privacy Policy
        </Link>
      </footer>
    </div>
  );
}
