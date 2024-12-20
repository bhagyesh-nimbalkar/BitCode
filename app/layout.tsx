import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "@/lib/api/Provider";
import ContextProvider from "@/context/ContextProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "BitCode - The World's Leading Online Programming Learning Platform",
  description: "The World's Leading Online Programming Learning Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-full`}
      >
        <Provider>
           <ContextProvider>
                 {children}
           </ContextProvider>
           
        </Provider>
      </body>
    </html>
  );
}
