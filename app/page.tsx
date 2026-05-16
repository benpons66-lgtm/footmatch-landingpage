"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  Apple,
  ArrowRight,
  Bell,
  CalendarPlus,
  Check,
  ChevronRight,
  CircleDot,
  MapPin,
  MessageCircle,
  Play,
  ShieldCheck,
  Sparkles,
  Users,
  Zap
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 }
};

const matchCards = [
  {
    title: "Fini les groupes WhatsApp désorganisés",
    text: "Un seul endroit pour les dispos, les confirmations et les infos du match.",
    icon: MessageCircle
  },
  {
    title: "Trouve des joueurs rapidement",
    text: "Complète une équipe en quelques minutes avec des joueurs proches et motivés.",
    icon: Zap
  },
  {
    title: "Organise tes matchs facilement",
    text: "Créneau, niveau, terrain, nombre de places: tout est clair dès le départ.",
    icon: CalendarPlus
  },
  {
    title: "Rejoins des matchs près de toi",
    text: "Five, city stade ou foot à 11: repère les parties ouvertes autour de toi.",
    icon: MapPin
  }
];

function StoreBadge({
  type,
  label,
  icon
}: {
  type: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button className="store-badge flex h-14 min-w-[168px] items-center gap-3 rounded-2xl px-4 text-left">
      <span className="text-white">{icon}</span>
      <span>
        <span className="block text-[11px] uppercase tracking-[0.18em] text-ash">
          Bientot disponible
        </span>
        <span className="block font-semibold text-white">{type}</span>
      </span>
      <span className="sr-only">{label}</span>
    </button>
  );
}

function PhoneMockup({
  variant,
  title,
  subtitle,
  className = ""
}: {
  variant: "create" | "join" | "chat";
  title: string;
  subtitle: string;
  className?: string;
}) {
  const isCreate = variant === "create";
  const isJoin = variant === "join";

  return (
    <motion.div
      variants={fadeUp}
      className={`relative mx-auto w-[248px] rounded-[2.3rem] border border-white/12 bg-[#070b09] p-3 shadow-soft ${className}`}
    >
      <div className="absolute left-1/2 top-3 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-black" />
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/8 bg-[#08110d]">
        <div className="field-lines absolute inset-0 opacity-25" />
        <div className="relative min-h-[472px] p-4">
          <div className="mb-7 flex items-center justify-between pt-4">
            <div className="flex min-w-0 items-center">
              <Image
                src="/brand/logo-footmatch-transparent.png"
                alt=""
                width={118}
                height={54}
                className="h-auto w-[104px]"
              />
            </div>
            <Bell size={16} className="text-neon" />
          </div>

          <div className="mb-5">
            <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-neon">
              {subtitle}
            </p>
            <h3 className="font-display text-2xl font-black leading-tight text-white">
              {title}
            </h3>
          </div>

          {isCreate && (
            <div className="space-y-3">
              {["Five indoor", "Ce soir, 20:30", "8 / 10 joueurs"].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.045] px-4 py-3"
                >
                  <span className="text-sm text-white">{item}</span>
                  <Check size={15} className="text-neon" />
                </div>
              ))}
              <div className="rounded-2xl bg-neon p-4 text-[#041007] shadow-glow">
                <p className="text-xs font-bold uppercase tracking-[0.14em]">
                  Match prêt
                </p>
                <p className="mt-2 text-2xl font-black">Publier</p>
              </div>
            </div>
          )}

          {isJoin && (
            <div className="space-y-3">
              {[
                ["City Stade Nord", "1.2 km", "3 places"],
                ["Five Arena", "2.8 km", "2 places"],
                ["Foot a 11", "4.1 km", "5 places"]
              ].map(([place, distance, seats]) => (
                <div
                  key={place}
                  className="rounded-2xl border border-white/8 bg-white/[0.045] p-3"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">{place}</p>
                    <ChevronRight size={16} className="text-neon" />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-ash">
                    <span>{distance}</span>
                    <span className="rounded-full bg-neon/12 px-2 py-1 text-neon">
                      {seats}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {variant === "chat" && (
            <div className="space-y-3">
              {[
                ["Samir", "Je peux venir avec un gardien."],
                ["Nina", "Terrain réservé à 19h."],
                ["You", "Parfait, on valide l'équipe."]
              ].map(([name, message], index) => (
                <div
                  key={name}
                  className={`max-w-[92%] rounded-2xl px-3 py-3 ${
                    index === 2
                      ? "ml-auto bg-neon text-[#041007]"
                      : "bg-white/[0.055] text-white"
                  }`}
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] opacity-70">
                    {name}
                  </p>
                  <p className="mt-1 text-sm leading-snug">{message}</p>
                </div>
              ))}
              <div className="mt-5 flex items-center gap-2 rounded-2xl border border-white/8 bg-black/25 px-3 py-3">
                <CircleDot size={14} className="text-neon" />
                <span className="text-xs text-ash">Message équipe...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });
      const rawResponse = await response.text();
      let data: { message?: string } = {};

      if (rawResponse) {
        try {
          data = JSON.parse(rawResponse) as { message?: string };
        } catch {
          throw new Error("Le serveur n'a pas renvoyé une réponse valide.");
        }
      }

      if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue.");
      }

      setFormState("success");
      setMessage(data.message || "Merci, ton email a bien été pris en compte.");
      setEmail("");
    } catch (error) {
      setFormState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Impossible d'enregistrer ton email pour le moment."
      );
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-pitch">
      <div className="noise" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[min(920px,92vw)] -translate-x-1/2 rounded-full bg-neon/10 blur-[110px]" />

      <section className="relative z-10 px-5 pb-20 pt-5 sm:px-8 lg:px-10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between py-5">
          <Image
            src="/brand/logo-footmatch-transparent.png"
            alt="FootMatch"
            width={186}
            height={85}
            priority
            className="h-auto w-48 sm:w-60 lg:w-72"
          />
          <a
            href="/contact"
            className="hidden rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-neon/40 hover:text-white sm:inline-flex"
          >
            Contact
          </a>
        </nav>

        <div className="mx-auto grid max-w-7xl items-center gap-12 pt-14 lg:grid-cols-[1fr_0.92fr] lg:gap-6 lg:pt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.08 }}
            className="max-w-3xl"
          >
            <motion.div
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-neon/20 bg-neon/8 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-neon green-glow"
            >
              <Sparkles size={14} />
              Organise. Rejoins. Joue.
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-display text-[clamp(4rem,18vw,8.4rem)] font-black leading-[0.86] tracking-normal text-white"
            >
              Trouve
              <span className="block text-neon drop-shadow-[0_0_28px_rgba(57,255,136,0.34)]">
                ton match.
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl"
            >
              L'application qui permet aux joueurs loisirs de créer ou rejoindre
              un match en 30 secondes.
            </motion.p>

            <motion.form
              variants={fadeUp}
              onSubmit={handleSubmit}
              className="mt-9 flex w-full max-w-2xl flex-col gap-3 rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-2 shadow-soft backdrop-blur-xl sm:flex-row"
            >
              <label className="sr-only" htmlFor="email">
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="ton.email@exemple.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-14 min-w-0 flex-1 rounded-2xl border border-transparent bg-black/25 px-5 text-base text-white outline-none transition placeholder:text-white/35 focus:border-neon/45"
              />
              <button
                type="submit"
                disabled={formState === "loading"}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-neon px-5 text-sm font-black text-[#041007] shadow-glow transition hover:-translate-y-0.5 hover:bg-mint sm:px-6"
              >
                {formState === "loading"
                  ? "Inscription..."
                  : "Être informé du lancement"}
                <ArrowRight size={18} />
              </button>
            </motion.form>
            {message && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-3 max-w-2xl text-sm ${
                  formState === "success" ? "text-neon" : "text-red-300"
                }`}
              >
                {message}
              </motion.p>
            )}

            <motion.div
              variants={fadeUp}
              className="mt-5 flex flex-col gap-3 sm:flex-row"
            >
              <StoreBadge
                type="App Store"
                label="FootMatch bientot disponible sur App Store"
                icon={<Apple size={23} />}
              />
              <StoreBadge
                type="Google Play"
                label="FootMatch bientot disponible sur Google Play"
                icon={<Play size={21} />}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="absolute inset-x-8 top-16 h-72 rounded-full bg-neon/20 blur-[80px]" />
            <div className="relative grid place-items-center">
              <PhoneMockup
                variant="join"
                title="Match ouvert près de toi"
                subtitle="Rejoindre"
                className="rotate-[-4deg]"
              />
              <div className="premium-border absolute -right-2 bottom-10 hidden w-52 rounded-[1.4rem] p-4 sm:block">
                <div className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
                  <Users size={18} className="text-neon" />
                  Équipe en cours
                </div>
                <div className="flex -space-x-2">
                  {["AM", "LK", "NS", "YO", "+3"].map((name) => (
                    <span
                      key={name}
                      className="grid h-9 w-9 place-items-center rounded-full border border-black bg-white text-[11px] font-black text-black"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 px-5 py-16 sm:px-8 lg:px-10" id="app">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-neon">
                Apercu application
              </p>
              <h2 className="font-display text-4xl font-black text-white sm:text-5xl">
                Toute l'organisation, dans la poche.
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-white/62">
              Crée un match, trouve les joueurs manquants et garde la discussion
              au même endroit.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ staggerChildren: 0.12 }}
            className="grid gap-8 md:grid-cols-3"
          >
            <PhoneMockup variant="create" title="Crée ton match" subtitle="Création" />
            <PhoneMockup variant="join" title="Rejoins en 1 tap" subtitle="Matchs" />
            <PhoneMockup variant="chat" title="Équipe synchronisée" subtitle="Communauté" />
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {matchCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: index * 0.06 }}
                  className="premium-border rounded-[1.6rem] p-5"
                >
                  <div className="mb-8 grid h-12 w-12 place-items-center rounded-2xl bg-neon/12 text-neon">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-black leading-tight text-white">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-white/58">{card.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-5 py-16 sm:px-8 lg:px-10">
        <div className="premium-border mx-auto max-w-7xl overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-neon/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-neon">
                <ShieldCheck size={14} />
                Communauté
              </div>
              <h2 className="font-display text-3xl font-black leading-tight text-white sm:text-5xl">
                Déjà des joueurs prêts à rejoindre la communauté FootMatch.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/62">
                La communauté se construit avant le lancement. Inscris-toi pour
                recevoir l'accès en priorité et faire partie des premiers joueurs
                à organiser leurs matchs sur FootMatch.
              </p>
            </div>
            <div className="rounded-[1.6rem] border border-neon/18 bg-black/28 p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-neon/12 text-neon">
                  <Users size={22} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Liste d'attente</p>
                  <p className="text-sm text-white/52">Ouverture prochaine</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  "Accès prioritaire au lancement",
                  "Premières villes activées avec la communauté",
                  "Invitations pour les joueurs motivés"
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.045] px-4 py-3 text-sm text-white/72"
                  >
                    <Check size={16} className="shrink-0 text-neon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 px-5 pb-10 pt-12 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Image
              src="/brand/logo-footmatch-transparent.png"
              alt="FootMatch"
              width={150}
              height={68}
              className="h-auto w-32"
            />
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/56">
              <a href="mailto:contact@footmatch.io" className="hover:text-neon">
                contact@footmatch.io
              </a>
              <a href="https://footmatch.io" className="hover:text-neon">
                footmatch.io
              </a>
            </div>
            <p className="mt-3 text-xs text-white/38">
              © 2026 FootMatch. Tous droits réservés.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/50">
            <a href="/politique-confidentialite" className="hover:text-neon">
              Politique de confidentialité
            </a>
            <a href="/conditions-utilisation" className="hover:text-neon">
              Conditions d'utilisation
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
