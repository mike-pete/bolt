"use client";

import { type ReactNode } from "react";
import AuthScreen from "./AuthScreen";
import NavBar from "./NavBar";

const ExtensionLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen max-h-screen flex-col flex-nowrap overflow-hidden bg-zinc-50">
      <AuthScreen>
        <NavBar />
        <div className="flex-grow overflow-auto">{children}</div>
      </AuthScreen>
    </div>
  );
};

export default ExtensionLayout;
