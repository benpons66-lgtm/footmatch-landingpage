import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Conditions d'utilisation - FootMatch",
  description: "Conditions générales d'utilisation de FootMatch – règles d'utilisation de l'application et du site.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "https://footmatch.io/conditions-utilisation"
  }
};

export default function TermsPage() {
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
            Conditions d'utilisation
          </h1>
          <div className="mt-8 space-y-6 text-sm leading-7 text-white/66">
            <p>
              Cette page d'attente présente FootMatch, une application en cours
              de lancement destinée à faciliter l'organisation de matchs de
              football amateur.
            </p>
            <p>
              L'inscription à la liste d'attente ne garantit pas une date
              d'accès précise. FootMatch pourra contacter les personnes inscrites
              afin de partager les informations de lancement.
            </p>
            <p>
              Le contenu du site peut évoluer avant la sortie officielle de
              l'application. Pour toute question, écris à{" "}
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
