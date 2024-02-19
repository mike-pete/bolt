"use client";

import { SessionProvider } from "next-auth/react";
import { type ReactNode } from "react";
import NavBar from "./NavBar";
import AuthScreen from "./AuthScreen";

const ExtensionLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SessionProvider>
      <div className="flex h-screen max-h-screen flex-col flex-nowrap">
        <AuthScreen>
          <NavBar />
          <div className="px-4 py-3">{children}</div>
        </AuthScreen>
      </div>
    </SessionProvider>
  );
};

export default ExtensionLayout;
