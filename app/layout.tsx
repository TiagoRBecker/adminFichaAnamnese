"use client"
import type React from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Open_Sans } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import ReactQueryProvider from "./provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["400", "600", "700", "900"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
           <SessionProvider>
      <body
        className={`font-sans ${montserrat.variable} ${openSans.variable} ${GeistMono.variable} antialiased`}
      >
   
          <ReactQueryProvider>
            <Suspense fallback={null}>{children}</Suspense>
            <Toaster />
          </ReactQueryProvider>
          <Analytics />
       
      </body>
       </SessionProvider>
    </html>
  );
}
