import type { Metadata } from "next";
import { Geist, Geist_Mono, EB_Garamond } from "next/font/google"; // CHANGED: Orbitron -> EB_Garamond
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// CODE NEXUS: Initializing 'EB Garamond' for High-End aesthetic
const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], // Loading rich weights
});

export const metadata: Metadata = {
  title: "FlyraShop | فلایراشاپ",
  description: "Marketplace for underground goods",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ebGaramond.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}