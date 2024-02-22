import Image from "next/image";
import BuyWithStripe from "./_components/BuyWithStripe";
import NavBar from "./_components/NavBar";

export default async function Home() {
  return (
    <div>
      <NavBar />
      <div className="flex justify-center">
        <div className="flex max-w-md flex-col p-8">
          <section className="flex flex-col h-screen">
            <div className="flex flex-col items-center h-4/6 justify-center">
              <div className="flex items-center gap-4">
                <Image src="/bolt.svg" alt="Bolt" width={40} height={40} />
                <h1 className="text-7xl font-semibold">Bolt</h1>
              </div>
              <h3 className="text-lg font-black uppercase tracking-wider text-zinc-500">
                Early Access
              </h3>
            </div>

            <BuyWithStripe />
          </section>
        </div>
      </div>
    </div>
  );
}
