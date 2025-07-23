import type { Metadata } from "next";
import "./globals.css";
import { Archivo_Black, Space_Grotesk } from "next/font/google";
import { Text } from "@/components/retroui/Text";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-head",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Dino-Dex",
  description:
    "Browse thousands of dinosaurs on The Dino-Dex, learn interesting facts and find thousands of images, articles and data about (almost) every dinosaur species.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${archivoBlack.variable} ${space.variable} antialiased bg-gray-100`}
      >
        <div className="font-sans">
          <div className="bg-emerald-500 w-full flex items-center justify-center py-3">
            <Text as="h1" className="text-white text-3xl font-sans">
              The Dino-Dex
            </Text>
          </div>
          <div className="container mx-auto my-8 px-4">{children}</div>
        </div>
      </body>
    </html>
  );
}
