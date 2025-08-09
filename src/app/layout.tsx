import type { Metadata } from "next";
import "./globals.css";
import { Archivo_Black, Space_Grotesk, Tomorrow } from "next/font/google";
import NavBar from "@/components/NavBar";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-head",
  display: "swap",
});

const tomorrow = Tomorrow({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-logo",
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
        className={`${archivoBlack.variable} ${space.variable} ${tomorrow.variable} antialiased bg-gray-100`}
      >
        <div className="font-sans">
          <NavBar />
          <div className="container mx-auto my-8 px-4">{children}</div>
        </div>
      </body>
    </html>
  );
}
