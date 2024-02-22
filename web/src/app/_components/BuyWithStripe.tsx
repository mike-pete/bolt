import { IconArrowRight } from "@tabler/icons-react";

const BuyWithStripe: React.FC = () => {
  return (
    <div className="flex">
      <a
        className="group flex items-center gap-2 rounded-lg bg-sky-400 p-4 text-xl font-bold uppercase text-white"
        href="https://buy.stripe.com/dR617A4zy0aD6hW6op"
      >
        Buy Now <IconArrowRight size={30} stroke={3} />
      </a>
    </div>
  );
};

export default BuyWithStripe;
