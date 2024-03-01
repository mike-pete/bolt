"use client";

import { IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import LoadingSpinner from "../../_components/LoadingSpinner";

// third party cookies will be restricted in Chrome in Q3 2024
// https://developers.google.com/privacy-sandbox/3pcd/storage-access-api
// https://github.com/nextauthjs/next-auth/discussions/1585

const useCookieAccess = () => {
  const [loading, setLoading] = useState(true);
  const [hasCookieAccess, setHasCookieAccess] = useState(false);

  useEffect(() => {
    if (typeof document.hasStorageAccess !== "function") {
      setLoading(false);
      setHasCookieAccess(true);
    }
  }, []);

  const requestCookieAccess = useCallback(async () => {
    setLoading(true);
    document.requestStorageAccess().then(
      () => {
        setHasCookieAccess(true);
        window.location.reload();
      },
      () => {
        setHasCookieAccess(false);
        setLoading(false);
      },
    );
  }, []);

  useEffect(() => {
    const checkCookieAccess = async () => {
      const hasAccess = await document.hasStorageAccess();
      if (!hasAccess) {
        void requestCookieAccess();
      }
      setHasCookieAccess(hasAccess);
      setLoading(false);
    };
    void checkCookieAccess();
  }, [requestCookieAccess]);

  return { loading, hasCookieAccess, requestCookieAccess };
};

const AuthScreen: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    loading: cookieAccessLoading,
    hasCookieAccess,
    requestCookieAccess,
  } = useCookieAccess();
  const { status } = useSession();
  const [clickedLogin, setClickedLogin] = useState(false);

  if (clickedLogin) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
        <button
          className="flex gap-2 rounded-full border bg-sky-400 px-3 py-2 font-semibold uppercase text-white"
          onClick={() => window.location.reload()}
        >
          ENTER
          <IconArrowRight />
        </button>
      </div>
    );
  }

  if (cookieAccessLoading || status === "loading") {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner size={30} />
      </div>
    );
  }

  if (!hasCookieAccess) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
        <p className="rounded-xl border p-3">
          We use cookies so you can log in. Without cookies our systems wont
          work properly. 🍪
        </p>
        <button
          onClick={requestCookieAccess}
          className="rounded-full border px-3 py-2"
        >
          allow access
        </button>
      </div>
    );
  }

  if (status === "authenticated") {
    return <>{children}</>;
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
      <a
        target="_blank"
        href={`${window.location.origin}/api/auth/signin/google`}
        rel="noopener noreferrer"
        className="flex gap-2 rounded-full border bg-sky-400 px-3 py-2 font-semibold uppercase text-white"
        onClick={() => setClickedLogin(true)}
      >
        LOGIN
        <IconArrowUpRight />
      </a>
    </div>
  );
};

export default AuthScreen;