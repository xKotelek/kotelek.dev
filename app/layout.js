import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FooterComponent from "@/components/Footer";
import CursorComponent from "@/components/CursorComponent";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "kotelek.dev",
  description: "Frontend & backend developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ad46ff" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://kit.fontawesome.com/681f16d40f.js" crossOrigin="anonymous"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        <div className="select-none w-full h-screen absolute left-0 top-0 font-[family-name:var(--font-geist-sans)]">
          <CursorComponent/>
          {children}
          <noscript className="noscript-message">Please enable javascript in order to use this website!</noscript>
        </div>
        <footer>
          <FooterComponent/>
        </footer>
      </body>
    </html>
  );
}
