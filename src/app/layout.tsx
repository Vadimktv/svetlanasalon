import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

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
  description: "Премиальный салон красоты в Геленджике",
  appleWebApp: {
    title: "SvetlanaSalon",
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    images: ['/ui/svetlana-salon-hero.webp'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${playfair.variable} ${montserrat.variable} font-sans antialiased bg-[#ebdcd4] text-[#2c2c2c] min-h-screen relative overflow-x-hidden`}>
        {/* Background decorative elements for desktop */}
        <div className="hidden md:block absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/20 blur-[120px] rounded-full pointer-events-none z-0"></div>
        <div className="hidden md:block absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#a8a39d]/20 blur-[120px] rounded-full pointer-events-none z-0"></div>
        {children}
      </body>
    </html>
  );
}
