"use client";

import { SessionProvider } from "next-auth/react";
import { type ReactNode } from "react";
import AuthScreen from "./AuthScreen";
import NavBar from "./NavBar";

const ExtensionLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SessionProvider>
      <div className="flex h-screen max-h-screen flex-col flex-nowrap">
        <AuthScreen>
          <NavBar />
          {children}
        </AuthScreen>
      </div>
    </SessionProvider>
  );
};

export default ExtensionLayout;
