"use client";

import { useEffect, useState } from "react";
import { Apple, Play } from "lucide-react";

const APP_STORE_URL = "https://apps.apple.com/app/id6772621131";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=fr.footmatch.app";
const GA_MEASUREMENT_ID = "G-3W2TJF70ZE";

type DetectedOS = "ios" | "android" | "desktop";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function detectOS(): DetectedOS {
  const ua = window.navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  if (/android/i.test(ua)) return "android";
  return "desktop";
}

function trackRedirectClick(os: DetectedOS) {
  const params = new URLSearchParams(window.location.search);
  const eventPayload = {
    event_category: "download",
    utm_source: params.get("utm_source") ?? "(direct)",
    utm_medium: params.get("utm_medium") ?? "(none)",
    utm_content: params.get("utm_content") ?? "",
    target_os: os
  };

  const fireEvent = () => {
    window.gtag?.("event", "redirect_click", eventPayload);
  };

  if (window.gtag) {
    fireEvent();
    return;
  }

  // La page globale charge gtag 3s après le "load" pour ne pas ralentir
  // l'affichage — trop lent ici puisqu'on redirige en quelques centaines de
  // ms. On charge donc gtag nous-mêmes, immédiatement, uniquement sur cette
  // page.
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.onload = fireEvent;
  document.head.appendChild(script);
}

export default function TelechargerPage() {
  const [os, setOs] = useState<DetectedOS | null>(null);

  useEffect(() => {
    const detected = detectOS();
    setOs(detected);
    trackRedirectClick(detected);

    if (detected === "desktop") return;

    const target = detected === "ios" ? APP_STORE_URL : PLAY_STORE_URL;
    const timer = window.setTimeout(() => {
      window.location.href = target;
    }, 400);

    return () => window.clearTimeout(timer);
  }, []);

  return (
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

        {os && os !== "desktop" ? (
          <>
            <h1 className="font-display text-3xl font-black text-white sm:text-4xl">
              Direction le store...
            </h1>
            <p className="mt-4 max-w-md text-base leading-7 text-white/85">
              Redirection automatique vers {os === "ios" ? "l'App Store" : "Google Play"}.
              Si rien ne se passe, clique sur le bouton ci-dessous.
            </p>
          </>
        ) : (
          <>
            <h1 className="font-display text-3xl font-black text-white sm:text-4xl">
              Télécharge FootMatch
            </h1>
            <p className="mt-4 max-w-md text-base leading-7 text-white/85">
              Trouve un match en 30 secondes. 100% gratuit, disponible sur
              iPhone et Android.
            </p>
          </>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Télécharger FootMatch sur l'App Store"
            className="store-badge flex h-14 min-w-[200px] items-center justify-center gap-3 rounded-2xl px-4"
          >
            <Apple size={23} className="text-white" />
            <span>
              <span className="block text-[11px] uppercase tracking-[0.18em] text-white/85">
                Télécharger sur
              </span>
              <span className="block font-semibold text-white">App Store</span>
            </span>
          </a>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Télécharger FootMatch sur Google Play"
            className="store-badge flex h-14 min-w-[200px] items-center justify-center gap-3 rounded-2xl px-4"
          >
            <Play size={21} className="text-white" />
            <span>
              <span className="block text-[11px] uppercase tracking-[0.18em] text-white/85">
                Télécharger sur
              </span>
              <span className="block font-semibold text-white">Google Play</span>
            </span>
          </a>
        </div>
      </div>
    </main>
  );
}
