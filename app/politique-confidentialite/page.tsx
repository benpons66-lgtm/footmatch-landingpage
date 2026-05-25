import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Politique de confidentialite - FootMatch",
  alternates: {
    canonical: "https://footmatch.io/politique-confidentialite"
  }
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-pitch px-5 py-8 text-white sm:px-8">
      <div className="noise" />
      <article className="relative z-10 mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition hover:text-neon"
        >
          <ArrowLeft size={16} />
          Retour
        </Link>
        <div className="premium-border rounded-[2rem] p-6 sm:p-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-neon">
            FootMatch
          </p>
          <h1 className="font-display text-4xl font-black sm:text-5xl">
            Politique de confidentialité
          </h1>
          <div className="mt-8 space-y-6 text-sm leading-7 text-white/66">
            <p>
              FootMatch collecte uniquement les informations nécessaires à la
              liste d'attente, notamment l'adresse email transmise via le
              formulaire.
            </p>
            <p>
              Ces données servent à informer les personnes inscrites du lancement
              de l'application, des accès anticipés et des actualités directement
              liées à FootMatch.
            </p>
            <p>
              Les données ne sont pas vendues à des tiers. Une demande de
              suppression peut être envoyée à{" "}
              <a href="mailto:contact@footmatch.io" className="text-neon">
                contact@footmatch.io
              </a>
              .
            </p>
            <p>Dernière mise à jour : 16 mai 2026.</p>
          </div>
        </div>
      </article>
    </main>
  );
}
