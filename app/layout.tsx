import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "modern-normalize";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";

const manropeSans = Manrope({
  variable: "--font-manrope-sans",
  subsets: ["latin"],
});

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rental Car",
  description: "Renting car application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interSans.variable} ${manropeSans.variable}`}>
        <TanStackProvider>
          <Header />
          <main> {children}</main>
        </TanStackProvider>
      </body>
    </html>
  );
}
