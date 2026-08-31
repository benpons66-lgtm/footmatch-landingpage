import type { Metadata } from "next";

const APP_STORE_URL = "https://apps.apple.com/app/id6772621131";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=fr.footmatch.app";
const GA_MEASUREMENT_ID = "G-3W2TJF70ZE";

export const metadata: Metadata = {
  title: "Télécharger FootMatch",
  description:
    "Télécharge FootMatch sur iPhone ou Android et trouve un match de foot près de chez toi en 30 secondes.",
  robots: { index: false, follow: true }
};

// Ce script est inline et s'exécute au moment du parsing du HTML : il ne
// dépend NI du bundle React, NI de l'hydratation. La redirection part donc
// même si le JS de Next met du temps à arriver (4G lente, preview Vercel
// protégée, navigateur in-app...).
const redirectScript = `
(function () {
  try {
    var ua = navigator.userAgent || "";
    var isIOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (/Macintosh/.test(ua) && (navigator.maxTouchPoints > 1 || "ontouchstart" in window));
    var isAndroid = /android/i.test(ua);
    if (!isIOS && !isAndroid) return;

    var target = isIOS ? ${JSON.stringify(APP_STORE_URL)} : ${JSON.stringify(PLAY_STORE_URL)};
    var osLabel = isIOS ? "ios" : "android";

    // Bascule l'affichage sur "Direction le store..." sans attendre React.
    document.documentElement.setAttribute("data-fm-os", osLabel);

    var done = false;
    function go() {
      if (done) return;
      done = true;
      window.location.replace(target);
    }

    var params = new URLSearchParams(window.location.search);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", ${JSON.stringify(GA_MEASUREMENT_ID)}, { transport_type: "beacon" });
    window.gtag("event", "redirect_click", {
      event_category: "download",
      utm_source: params.get("utm_source") || "(direct)",
      utm_medium: params.get("utm_medium") || "(none)",
      utm_content: params.get("utm_content") || "",
      target_os: osLabel,
      transport_type: "beacon",
      event_callback: go,
      event_timeout: 700
    });

    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}";
    document.head.appendChild(s);

    // Filet de sécurité : on part vers le store au plus tard après 900 ms,
    // que Google Analytics ait répondu ou non.
    window.setTimeout(go, 900);
  } catch (e) {
    /* en cas d'erreur on laisse les boutons manuels faire le job */
  }
})();
`;

export default function TelechargerPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .fm-redirecting { display: none; }
            html[data-fm-os] .fm-redirecting { display: block; }
            html[data-fm-os] .fm-default { display: none; }
            html[data-fm-os="ios"] .fm-store-name::after { content: "l'App Store"; }
            html[data-fm-os="android"] .fm-store-name::after { content: "Google Play"; }
          `
        }}
      />

      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-pitch px-5 py-16 text-center">
        <div className="noise" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[min(760px,92vw)] -translate-x-1/2 rounded-full bg-neon/10 blur-[110px]" />

        <div className="relative z-10 flex flex-col items-center">
          <img
            src="/brand/logo-footmatch-site.webp"
            alt="FootMatch"
            width={160}
            height={73}
            className="mb-8 h-auto w-40"
          />

          <div className="fm-redirecting">
            <h1 className="font-display text-3xl font-black text-white sm:text-4xl">
              Direction le store...
            </h1>
            <p className="mt-4 max-w-md text-base leading-7 text-white/85">
              Redirection automatique vers <span className="fm-store-name" />.
              Si rien ne se passe, clique sur le bouton ci-dessous.
            </p>
          </div>

          <div className="fm-default">
            <h1 className="font-display text-3xl font-black text-white sm:text-4xl">
              Télécharge FootMatch
            </h1>
            <p className="mt-4 max-w-md text-base leading-7 text-white/85">
              Trouve un match en 30 secondes. 100% gratuit, disponible sur
              iPhone et Android.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={APP_STORE_URL}
              rel="noreferrer"
              aria-label="Télécharger FootMatch sur l'App Store"
              className="store-badge flex h-14 min-w-[200px] items-center justify-center gap-3 rounded-2xl px-4"
            >
              <svg
                viewBox="0 0 24 24"
                width="23"
                height="23"
                fill="currentColor"
                aria-hidden="true"
                className="shrink-0 text-white"
              >
                <path d="M16.365 1.43c0 1.14-.42 2.2-1.26 3.02-.9.89-1.98 1.4-3.06 1.32-.13-1.1.42-2.24 1.23-3.02.9-.88 2.16-1.44 3.09-1.32ZM20.5 17.2c-.5 1.14-.74 1.65-1.38 2.66-.9 1.41-2.17 3.17-3.74 3.18-1.4.02-1.76-.9-3.66-.89-1.9.01-2.29.91-3.69.89-1.57-.01-2.77-1.6-3.67-3.01C1.86 15.99 1.6 11.35 3.15 8.9c1.1-1.74 2.83-2.76 4.46-2.76 1.66 0 2.7.9 4.07.9 1.33 0 2.14-.9 4.06-.9 1.45 0 2.99.79 4.09 2.15-3.6 1.96-3.02 7.08.67 8.91Z" />
              </svg>
              <span>
                <span className="block text-[11px] uppercase tracking-[0.18em] text-white/85">
                  Télécharger sur
                </span>
                <span className="block font-semibold text-white">App Store</span>
              </span>
            </a>
            <a
              href={PLAY_STORE_URL}
              rel="noreferrer"
              aria-label="Télécharger FootMatch sur Google Play"
              className="store-badge flex h-14 min-w-[200px] items-center justify-center gap-3 rounded-2xl px-4"
            >
              <svg
                viewBox="0 0 24 24"
                width="21"
                height="21"
                fill="currentColor"
                aria-hidden="true"
                className="shrink-0 text-white"
              >
                <path d="M3.6 1.84a1 1 0 0 0-.6.92v18.48a1 1 0 0 0 .6.92l10.1-10.16L3.6 1.84Zm11.5 8.75 2.9-2.92-11.2-6.3 8.3 9.22Zm0 2.82-8.3 9.23 11.2-6.3-2.9-2.93Zm1.42-1.41 3.3-3.32c.68-.38.68-1.38 0-1.76l-.02-.01-3.28 3.3v1.79Z" />
              </svg>
              <span>
                <span className="block text-[11px] uppercase tracking-[0.18em] text-white/85">
                  Télécharger sur
                </span>
                <span className="block font-semibold text-white">
                  Google Play
                </span>
              </span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
