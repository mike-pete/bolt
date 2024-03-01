import NavBar from "../_components/NavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <div className="flex flex-grow flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
