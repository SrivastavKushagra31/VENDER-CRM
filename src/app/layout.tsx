import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VendorBridge | Premium SaaS Management",
  description: "Operational SaaS for vendor onboarding, marketplace logs, and delivery hiring.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Sidebar />
        <main className="pl-64 min-h-screen relative">
          <Navbar />
          <div className="pt-20 px-8 py-10 animate-fade-in">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
