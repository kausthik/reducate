import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Black_Ops_One } from "next/font/google";
import { Caveat } from "next/font/google";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Personal_tracker",
  description: "Compete yourself",
};

export const blackOps = Black_Ops_One({
  weight: "400",
  subsets: ["latin"],
});

export const caveat = Caveat({
    weight: "500",
    subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        {children}
        </body>
    </html>
  );
}
