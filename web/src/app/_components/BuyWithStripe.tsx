import { IconArrowRight } from "@tabler/icons-react";

const BuyWithStripe: React.FC = () => {
  return (
    <a
      className="group flex items-center rounded-lg bg-sky-400 p-4 text-xl font-bold text-white gap-2 uppercase"
      href="https://buy.stripe.com/5kA7vYea82iLdKo144"
    >
      Buy Now <IconArrowRight size={30} stroke={3}/>
    </a>
  );
};

export default BuyWithStripe;
