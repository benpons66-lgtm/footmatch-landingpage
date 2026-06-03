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
  title: "FootMatch – Organise et rejoins des matchs de foot près de toi",
  description:
    "FootMatch est l'app gratuite pour organiser et rejoindre des matchs de foot près de chez toi. Trouve des joueurs, gère les dispos et joue plus souvent. 100% gratuit.",
  applicationName: "FootMatch",
  keywords: [
    "foot amateur",
    "matchs de foot",
    "organiser match foot",
    "rejoindre match foot",
    "five",
    "city stade",
    "football amateur",
    "trouver des joueurs de foot"
  ],
  robots: { index: true, follow: true },
  metadataBase: new URL("https://footmatch.io"),
  openGraph: {
    title: "FootMatch – Organise et rejoins des matchs de foot près de toi",
    description:
      "FootMatch est l'app gratuite pour organiser et rejoindre des matchs de foot près de chez toi. Trouve des joueurs, gère les dispos et joue plus souvent. 100% gratuit.",
    url: "https://footmatch.io",
    siteName: "FootMatch",
    images: [
      {
        url: "/brand/footmatch-og.png",
        width: 1200,
        height: 630,
        alt: "FootMatch – Organise et rejoins des matchs de foot près de toi"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "FootMatch – Organise et rejoins des matchs de foot près de toi",
    description:
      "FootMatch est l'app gratuite pour organiser et rejoindre des matchs de foot près de chez toi. Trouve des joueurs, gère les dispos et joue plus souvent. 100% gratuit.",
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
