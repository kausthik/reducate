import type { Metadata } from "next";
import "./globals.css";

import { Navbar } from "@/src/components/navbar/navbar"


export const metadata: Metadata = {
  title: "Leetcode-ranking",
  description: "Compete with friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar/>
        {children}
        </body>
    </html>
  );
}
