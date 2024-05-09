"use client";

import { Dialog } from "@headlessui/react";
import { loadStripe } from "@stripe/stripe-js";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type ReactNode } from "react";
import { env } from "~/env";
import { api } from "~/trpc/react";

const BillingModal: React.FC<{
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}> = ({ children, open, onClose }) => {
  return (
    <Dialog
      as="div"
      open={open}
      onClose={onClose}
      className="fixed inset-0 z-40 flex items-center justify-center bg-zinc-400/40 p-4 backdrop-blur-sm"
    >
      <Dialog.Panel className="overflow-hidden rounded-lg bg-zinc-50 shadow-lg">
        {children}
      </Dialog.Panel>
    </Dialog>
  );
};

const Billing = () => {
  const checkoutSession = api.checkout.createSession.useMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const paymentStatus = searchParams.get("paymentStatus");

  const handleCheckoutRedirect = async (sessionId: string) => {
    const stripe = await loadStripe(env.NEXT_PUBLIC_STRIPE_KEY);
    await stripe?.redirectToCheckout({ sessionId });
  };

  if (checkoutSession.data?.sessionId) {
    void handleCheckoutRedirect(checkoutSession.data.sessionId);
  }

  return (
    <>
      <div>
        <button
          onClick={() => {
            checkoutSession.mutate({
              priceId: "price_1P9pleJ8IkSaOlr1sH4jkVoX",
            });
          }}
        >
          subscribe
        </button>
      </div>
      <BillingModal
        onClose={() => {
          void router.push(pathname, { scroll: false });
        }}
        open={paymentStatus === "success"}
      >
        <div className="prose prose-lg prose-zinc p-8">
          <h3>Success!</h3>
        </div>
      </BillingModal>
    </>
  );
};

export default Billing;
