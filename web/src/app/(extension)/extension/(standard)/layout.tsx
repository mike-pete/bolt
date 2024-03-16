import { type ReactNode } from "react";
import NavBar from "./NavBar";

const StandardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-grow flex-col flex-nowrap overflow-hidden bg-zinc-50">
      <NavBar />
      <div className="flex-grow overflow-auto">{children}</div>
    </div>
  );
};

export default StandardLayout;
