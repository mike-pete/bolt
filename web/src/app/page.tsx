import BuyWithStripe from "./_components/BuyWithStripe";
import NavBar from "./_components/NavBar";

export default async function Home() {
  return (
    <div>
      <NavBar />
      <div className="flex items-center">
        <BuyWithStripe />
      </div>
    </div>
  );
}
