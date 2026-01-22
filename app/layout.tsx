import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zoomies - Ride Together, Build Your Tribe",
  description: "A social platform for bikers where you discover clubs through people and participate in organized rides like clan wars.",
  keywords: ["motorcycle", "bikers", "clubs", "rides", "social", "community", "marketplace"],
  authors: [{ name: "Zoomies Team" }],
  openGraph: {
    title: "Zoomies - Ride Together, Build Your Tribe",
    description: "A social platform for bikers where you discover clubs through people and participate in organized rides like clan wars.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
