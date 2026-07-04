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
      <body className={`${playfair.variable} ${montserrat.variable} font-sans antialiased bg-[#ebdcd4] md:bg-[#1a1a1a] text-[#2c2c2c] md:flex md:items-center md:justify-center md:min-h-screen relative overflow-hidden`}>
        {/* Background decorative elements for desktop */}
        <div className="hidden md:block absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#ebdcd4]/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="hidden md:block absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#a8a39d]/20 blur-[100px] rounded-full pointer-events-none"></div>
        {children}
      </body>
    </html>
  );
}
