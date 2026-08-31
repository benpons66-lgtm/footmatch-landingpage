import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const APP_STORE_URL = "https://apps.apple.com/app/id6772621131";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=fr.footmatch.app";

type DetectedOS = "ios" | "android" | "desktop";

// Depuis iOS 13, un iPad envoie le MEME user-agent qu'un Mac : impossible de
// les distinguer cote serveur. L'iPad tombe donc en "desktop" ici et c'est le
// script inline de la page (qui, lui, voit le tactile) qui le redirige.
function detectOS(ua: string): DetectedOS {
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "desktop";
}

export function middleware(request: NextRequest) {
  const ua = request.headers.get("user-agent") || "";
  const os = detectOS(ua);
  const { searchParams } = request.nextUrl;

  // ?debug=1 : montre ce que le SERVEUR voit reellement. A ouvrir depuis le
  // telephone quand la redirection ne se comporte pas comme prevu.
  if (searchParams.get("debug") === "1") {
    return new NextResponse(
      JSON.stringify(
        {
          middleware: "actif",
          user_agent_recu: ua,
          os_detecte: os,
          redirigerait_vers:
            os === "ios"
              ? APP_STORE_URL
              : os === "android"
                ? PLAY_STORE_URL
                : "aucune (traite comme desktop)"
        },
        null,
        2
      ),
      {
        status: 200,
        headers: {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "no-store"
        }
      }
    );
  }

  // ?stay=1 : affiche la page sans rediriger (pour verifier le rendu).
  if (searchParams.get("stay") === "1") return NextResponse.next();

  if (os === "desktop") return NextResponse.next();

  const response = NextResponse.redirect(
    os === "ios" ? APP_STORE_URL : PLAY_STORE_URL,
    307
  );
  response.headers.set("cache-control", "no-store");
  return response;
}

export const config = {
  matcher: "/telecharger"
};
