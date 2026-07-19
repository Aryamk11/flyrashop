import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import CartDrawer from "@/components/Cart/CartDrawer";

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
      <body className="antialiased">
        <Providers>
          {children}
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}