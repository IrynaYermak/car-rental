import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
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
        <Header />
        <main> {children}</main>
        <footer>
          <p>
            Created <time dateTime="2026">2026</time>
          </p>
        </footer>
      </body>
    </html>
  );
}
