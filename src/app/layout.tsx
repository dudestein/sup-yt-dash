import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";
import { AppProvider } from "./context/AppContext";

const geistSans = localFont({
  src: "./assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Youtube Dashboard",
  description: "Coding Exercise - Dashboard to play youtube videos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light h-screen">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-white dark:bg-black text-black dark:text-white`}
      >
        <AppProvider>{children}</AppProvider>
        {/*Load Youtube iFrame API script to interact with the video player */}
        <Script
          src="//www.youtube.com/iframe_api"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
