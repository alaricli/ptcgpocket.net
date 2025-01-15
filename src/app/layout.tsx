import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navigation/navbar/Navbar";
import Footer from "./components/navigation/footer/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "ptcgpocket.net",
  description:
    "Your all-in-one source for the latest and most reliable information on the Pokémon TCG Pocket game.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
