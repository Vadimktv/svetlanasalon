import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["cyrillic", "latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata = {
  title: "SvetlanaSalon | Эстетика и Косметология",
  description: "Премиальный салон красоты",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${playfair.variable} ${montserrat.variable} font-sans antialiased bg-[#ebdcd4] text-[#2c2c2c]`}>
        {/* We removed ScrollVideo and generic Navigation to build the exact mobile layout requested */}
        {children}
      </body>
    </html>
  );
}
