import { Navbar } from "@/src/components/navbar/navbar"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <>
        {children}
      </>
  );
}
