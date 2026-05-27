import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Mentions légales - FootMatch",
  alternates: {
    canonical: "https://footmatch.io/mentions-legales"
  }
};

export default function LegalNoticePage() {
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
            Mentions légales
          </h1>
          <p className="mt-4 border-b border-white/10 pb-6 text-sm leading-6 text-white/60">
            Dernière mise à jour : mai 2026. Conformément à la loi n°2004-575 du
            21 juin 2004 pour la confiance dans l'économie numérique.
          </p>

          <div className="mt-8 space-y-9 text-sm leading-7 text-white/72">
            <section>
              <h2 className="mb-4 border-l-2 border-neon pl-4 text-xl font-black text-white">
                1. Éditeur du site
              </h2>
              <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
                <ul className="space-y-2">
                  <li>
                    <strong className="text-white">Nom :</strong> Benjamin Pons
                  </li>
                  <li>
                    <strong className="text-white">Statut :</strong> Particulier
                  </li>
                  <li>
                    <strong className="text-white">Pays :</strong> France,
                    Perpignan (66)
                  </li>
                  <li>
                    <strong className="text-white">Email :</strong>{" "}
                    <a href="mailto:contact@footmatch.io" className="text-neon">
                      contact@footmatch.io
                    </a>
                  </li>
                  <li>
                    <strong className="text-white">
                      Directeur de la publication :
                    </strong>{" "}
                    Benjamin Pons
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="mb-4 border-l-2 border-neon pl-4 text-xl font-black text-white">
                2. Hébergement du site
              </h2>
              <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
                <p className="font-semibold text-white">Hébergement et déploiement</p>
                <ul className="mt-3 space-y-2">
                  <li>
                    <strong className="text-white">Société :</strong> Vercel Inc.
                  </li>
                  <li>
                    <strong className="text-white">Adresse :</strong> 440 N
                    Barranca Ave #4133, Covina, CA 91723, États-Unis
                  </li>
                  <li>
                    <strong className="text-white">Site :</strong>{" "}
                    <a
                      href="https://vercel.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neon"
                    >
                      vercel.com
                    </a>
                  </li>
                </ul>

                <p className="mt-6 font-semibold text-white">
                  Gestionnaire du nom de domaine
                </p>
                <ul className="mt-3 space-y-2">
                  <li>
                    <strong className="text-white">Société :</strong> Hostinger
                    International Ltd
                  </li>
                  <li>
                    <strong className="text-white">Adresse :</strong> 61 Lordou
                    Vironos str., 6023 Limassol, Chypre
                  </li>
                  <li>
                    <strong className="text-white">Site :</strong>{" "}
                    <a
                      href="https://www.hostinger.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neon"
                    >
                      hostinger.fr
                    </a>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="mb-4 border-l-2 border-neon pl-4 text-xl font-black text-white">
                3. Propriété intellectuelle
              </h2>
              <div className="space-y-4">
                <p>
                  Le nom <strong className="text-white">FootMatch</strong> est
                  une marque déposée auprès de l'Institut National de la Propriété
                  Industrielle (INPI) sous le numéro de dépôt{" "}
                  <strong className="text-white">5258647</strong>.
                </p>
                <p>
                  L'ensemble des contenus présents sur ce site et dans
                  l'application, incluant les textes, graphismes, logo, icônes,
                  charte graphique et code source, est la propriété exclusive de
                  Benjamin Pons et est protégé par les lois françaises et
                  internationales relatives à la propriété intellectuelle.
                </p>
                <p>
                  Toute reproduction, représentation, modification, publication
                  ou adaptation de tout ou partie des éléments du site est
                  interdite sans autorisation écrite préalable.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 border-l-2 border-neon pl-4 text-xl font-black text-white">
                4. Données personnelles
              </h2>
              <p>
                Les informations relatives au traitement des données personnelles
                sont détaillées dans la{" "}
                <Link href="/politique-confidentialite" className="text-neon">
                  Politique de confidentialité
                </Link>
                , conformément au Règlement Général sur la Protection des Données
                (RGPD) et à la loi Informatique et Libertés.
              </p>
              <p className="mt-4">
                Pour toute question relative à vos données personnelles :{" "}
                <a href="mailto:contact@footmatch.io" className="text-neon">
                  contact@footmatch.io
                </a>
              </p>
            </section>

            <section>
              <h2 className="mb-4 border-l-2 border-neon pl-4 text-xl font-black text-white">
                5. Limitation de responsabilité
              </h2>
              <div className="space-y-4">
                <p>
                  FootMatch est une plateforme de mise en relation entre joueurs
                  de football amateur. Les matchs sont organisés entre
                  particuliers. Benjamin Pons ne saurait être tenu responsable
                  des incidents, blessures ou dommages survenus lors des
                  rencontres organisées via l'application ou le site.
                </p>
                <p>
                  Benjamin Pons s'efforce d'assurer l'exactitude et la mise à
                  jour des informations diffusées sur ce site, mais ne peut
                  garantir l'exhaustivité ou l'absence d'erreur. Le contenu du
                  site peut être modifié à tout moment et sans préavis.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 border-l-2 border-neon pl-4 text-xl font-black text-white">
                6. Droit applicable
              </h2>
              <p>
                Les présentes mentions légales sont régies par le droit français.
                En cas de litige, les tribunaux du ressort de{" "}
                <strong className="text-white">Perpignan (France)</strong> sont
                compétents.
              </p>
            </section>

            <section>
              <h2 className="mb-4 border-l-2 border-neon pl-4 text-xl font-black text-white">
                7. Contact
              </h2>
              <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
                <ul className="space-y-2">
                  <li>
                    <strong className="text-white">Email :</strong>{" "}
                    <a href="mailto:contact@footmatch.io" className="text-neon">
                      contact@footmatch.io
                    </a>
                  </li>
                  <li>
                    <strong className="text-white">Site :</strong>{" "}
                    <a href="https://footmatch.io" className="text-neon">
                      footmatch.io
                    </a>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
