import { IconBrandChrome, IconBrandDiscordFilled } from "@tabler/icons-react";
import Image from "next/image";
import BuyWithStripe from "./_components/BuyWithStripe";
import NavBar from "./_components/NavBar";

export default async function Home() {
  return (
    <div>
      <NavBar />
      <div className="flex justify-center">
        <div className="flex max-w-md flex-col p-8">
          <section className="flex h-screen flex-col">
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
        </div>
      </div>
    </div>
  );
}
