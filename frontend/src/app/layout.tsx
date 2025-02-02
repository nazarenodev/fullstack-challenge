import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/template/Header";
import Footer from "../components/template/Footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        <div className="mb-auto">
          {children}
        </div>                
      </body>
    </html>
  );
}
