import { Suspense } from "react";
import NavBar from "../_components/NavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <NavBar />
      <Suspense>{children}</Suspense>
    </div>
  );
}
