import type { Metadata } from "next";
import {
  Instrument_Serif,
  Space_Grotesk,
  DM_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CREO — Never run a bad ad twice",
  description:
    "AI-powered ad creative analysis. Paste your ad copy, get structured feedback across 5 performance dimensions, and know exactly what to fix before you spend a dollar.",
  openGraph: {
    title: "CREO — Never run a bad ad twice",
    description:
      "AI-powered ad creative analysis across 5 performance dimensions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-creo-bg text-creo-text font-body">{children}</body>
    </html>
  );
}
