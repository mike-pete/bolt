"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { api } from "~/trpc/react";

const Billing = () => {
  const checkoutSession = api.checkout.createSession.useMutation();
  const router = useRouter();

  useEffect(() => {
    console.log(checkoutSession.data);
    if (checkoutSession.data?.url) {
      void router.push(checkoutSession.data.url);
    }
  }, [checkoutSession.data, checkoutSession.data?.url, router]);

  return (
    <div>
      <button
        onClick={() => {
          checkoutSession.mutate();
        }}
      >
        subscribe
      </button>
    </div>
  );
};

export default Billing;
