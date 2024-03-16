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
        <div className="flex h-2/6 flex-col items-center justify-end">
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
            className="group/try-now peer flex flex-col items-center justify-center gap-3"
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
            className="flex items-center gap-2 rounded-lg bg-zinc-200 p-2 font-semibold transition-all duration-150 hover:scale-105 peer-hover:translate-y-0.5 peer-hover:scale-95"
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
        <div className="flex h-[50vh] items-center justify-center bg-white bg-opacity-70 backdrop-blur-sm">
          <p className="w-4/5 max-w-3xl text-center  text-2xl font-bold md:text-5xl">
            Get an instant overview for every job on LinkedIn.
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

      <section className="flex w-full items-center justify-center p-4">
        <div className="flex w-full max-w-3xl flex-col gap-4">
          <h1 className="text-4xl font-black text-zinc-600 md:text-6xl">
            DEMO
          </h1>
          <iframe
            className="aspect-video w-full"
            src="https://www.youtube.com/embed/6YVicD784xA?si=E-MdxGoBMXF_1QqM"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        </div>
      </section>

      <section className="flex w-full items-center justify-center p-4">
        <div className="flex w-full max-w-3xl flex-col gap-4">
          <h1 className="text-4xl font-black text-zinc-600 md:text-6xl">Q&A</h1>

          <h3 className="text-xl font-semibold">How much does it cost?</h3>
          <p className="ml-4 border-l-4 p-3">{"It's"} only $1/month!</p>

          <h3 className="text-xl font-semibold">
            How do I cancel my subscription?
          </h3>
          <p className="ml-4 border-l-4 p-3">
            Cancel at any time by sending an email to mike@boltapply.com and{" "}
            {"I'll"} make sure {"it's"} canceled within 24 hrs!
          </p>

          <h3 className="text-xl font-semibold">Why {"can't"} I log in?</h3>
          <p className="ml-4 border-l-4 p-3">
            Once you purchase a subscription, {"you'll"} get an email within 24
            hours confirming the activation of your account. If you still have
            problems logging in after receiving the email, please let me know!
            mike@boltapply.com
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
      </section>

      <footer className="flex w-full justify-end gap-8 bg-gradient-to-b from-zinc-50 to-white p-6">
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
