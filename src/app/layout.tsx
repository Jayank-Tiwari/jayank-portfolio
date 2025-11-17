import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jayank Tiwari - AI & Full Stack Developer",
  description:
    "AI Engineer and Full Stack Developer portfolio for Jayank Tiwari, specializing in Generative AI, Next.js, and Python.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} h-full text-zinc-200 selection:bg-emerald-500 selection:text-emerald-950`}
      >
        {children}
      </body>
    </html>
  );
}
