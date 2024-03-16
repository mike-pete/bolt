import { type ReactNode } from "react";
import TopBar from "./TopBar";

const OnboardingLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-grow flex-col flex-nowrap overflow-hidden bg-zinc-50">
      <TopBar />
      <div className="flex-grow overflow-auto">{children}</div>
    </div>
  );
};

export default OnboardingLayout;
