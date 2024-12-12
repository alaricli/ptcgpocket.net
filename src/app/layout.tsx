import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navigation/navbar/Navbar";
import Footer from "./components/navigation/footer/Footer";

export const metadata: Metadata = {
  title: "professorsresearchtcg.com",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
