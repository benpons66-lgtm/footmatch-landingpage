import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
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
        url: "/brand/footmatch-og.png",
        width: 1200,
        height: 630,
        alt: "FootMatch - Trouve ton match"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "FootMatch - Trouve ton match",
    description:
      "L'application qui connecte les joueurs et simplifie l'organisation des matchs.",
    images: ["/brand/footmatch-og.png"]
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "192x192" }
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  },
  verification: {
    google: "YYd2tzAz967H8W-YIwRRN1aCbpodJ13Kz13iZtStkGg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${sora.variable}`}>
      <head>
        <link rel="canonical" href="https://footmatch.io/" />
      </head>
      <body>
        <link
          rel="preload"
          href="/brand/logo-footmatch-site.webp"
          as="image"
          type="image/webp"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function () {
                window.setTimeout(function () {
                  window.dataLayer = window.dataLayer || [];
                  window.gtag = function(){ window.dataLayer.push(arguments); };
                  window.gtag('js', new Date());
                  window.gtag('config', 'G-3W2TJF70ZE');
                  var script = document.createElement('script');
                  script.async = true;
                  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-3W2TJF70ZE';
                  document.head.appendChild(script);
                }, 3000);
              });
            `
          }}
        />
        {children}
      </body>
    </html>
  );
}
