import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FooterComponent from "@/components/Footer";
import CursorComponent from "@/components/CursorComponent";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.kotelek.dev"),
  title: "kotelek.dev",
  description: "Frontend & backend developer",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "kotelek.dev",
    siteName: "kotelek.dev",
    description: "xKotelek • Frontend & backend developer.",
    type: "website",
    url: "https://www.kotelek.dev",
    images: [{ url: "/icon.png", width: 128, height: 128, alt: "There should be logo" }],
  },
  twitter: {
    card: "summary",
    title: "kotelek.dev",
    description: "xKotelek • Frontend & backend developer.",
    images: ["/icon.png"],
  },
};

export const viewport = {
  themeColor: "#8200db",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Analytics />
        <div className="select-none relative w-full min-h-dvh font-[family-name:var(--font-geist-sans)]">
          <CursorComponent />
          {children}
          <noscript className="noscript-message">
            Please enable javascript in order to use this website!
          </noscript>
        </div>
        <footer>
          <FooterComponent />
        </footer>
      </body>
    </html>
  );
}
