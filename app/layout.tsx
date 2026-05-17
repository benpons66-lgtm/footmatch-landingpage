import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap"
});

export const metadata: Metadata = {
  title: "FootMatch - Trouve ton match",
  description:
    "FootMatch permet aux joueurs amateurs de créer ou rejoindre rapidement des matchs de football près de chez eux.",
  metadataBase: new URL("https://footmatch.io"),
  openGraph: {
    title: "FootMatch - Trouve ton match",
    description:
      "L'application qui permet aux joueurs amateurs de créer ou rejoindre un match facilement.",
    url: "https://footmatch.io",
    siteName: "FootMatch",
    images: [
      {
        url: "/brand/logo-footmatch-transparent.png",
        width: 1860,
        height: 846,
        alt: "Logo FootMatch"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" }
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${sora.variable}`}>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3W2TJF70ZE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3W2TJF70ZE');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
