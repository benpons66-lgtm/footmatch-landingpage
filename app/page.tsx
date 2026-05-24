import {
  Apple,
  Bell,
  CalendarPlus,
  Check,
  ChevronRight,
  CircleDot,
  Instagram,
  MapPin,
  MessageCircle,
  Play,
  ShieldCheck,
  Sparkles,
  Users,
  Zap
} from "lucide-react";
import { SignupForm } from "../components/SignupForm";


const matchCards = [
  {
    title: "Fini les groupes WhatsApp et Facebook dÃ©sorganisÃ©s",
    text: "Un seul endroit pour les dispos, les confirmations et les infos du match.",
    icon: MessageCircle
  },
  {
    title: "Trouve des joueurs rapidement",
    text: "ComplÃ¨te une Ã©quipe en quelques minutes avec des joueurs proches et motivÃ©s.",
    icon: Zap
  },
  {
    title: "Organise tes matchs facilement",
    text: "CrÃ©neau, niveau, terrain, nombre de places: tout est clair dÃ¨s le dÃ©part.",
    icon: CalendarPlus
  },
  {
    title: "Rejoins des matchs prÃ¨s de toi",
    text: "Five, city stade ou foot Ã  11: repÃ¨re les parties ouvertes autour de toi.",
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
    <button
      type="button"
      aria-label={label}
      className="store-badge flex h-14 min-w-[168px] items-center gap-3 rounded-2xl px-4 text-left"
    >
      <span className="text-white">{icon}</span>
      <span>
        <span className="block text-[11px] uppercase tracking-[0.18em] text-white/85">
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
    <div
      className={`relative mx-auto w-[248px] rounded-[2.3rem] border border-white/12 bg-[#070b09] p-3 shadow-soft ${className}`}
    >
      <div className="absolute left-1/2 top-3 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-black" />
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/8 bg-[#08110d]">
        <div className="field-lines absolute inset-0 opacity-25" />
        <div className="relative min-h-[472px] p-4">
          <div className="mb-7 flex items-center justify-between pt-4">
            <div className="flex min-w-0 items-center">
              <img
                src="/brand/logo-footmatch-site.webp"
                alt=""
                width={118}
                height={54}
                aria-hidden="true"
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
                  Match prÃªt
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
                  <div className="mt-3 flex items-center justify-between text-xs text-white/85">
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
                ["Nina", "Terrain rÃ©servÃ© Ã  19h."],
                ["You", "Parfait, on valide l'Ã©quipe."]
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
                <span className="text-xs text-white/85">Message Ã©quipe...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-pitch">
      <div className="noise" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[min(920px,92vw)] -translate-x-1/2 rounded-full bg-neon/10 blur-[110px]" />

      <section className="relative z-10 px-5 pb-20 pt-5 sm:px-8 lg:px-10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between py-5">
          <img
            src="/brand/logo-footmatch-site.webp"
            alt="FootMatch"
            width={186}
            height={85}
            className="h-auto w-48 sm:w-60 lg:w-72"
          />
          <a
            href="/contact"
            className="inline-flex rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-white/80 transition hover:border-neon/40 hover:text-white sm:px-4 sm:text-sm"
          >
            Contact
          </a>
        </nav>

        <div className="mx-auto grid max-w-7xl items-center gap-12 pt-14 lg:grid-cols-[1fr_0.92fr] lg:gap-6 lg:pt-20">
          <div className="max-w-3xl">
            <div
              className="animate-rise mb-6 inline-flex items-center gap-2 rounded-full border border-neon/20 bg-neon/8 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-neon green-glow"
            >
              <Sparkles size={14} />
              Organise. Rejoins. Joue.
            </div>
            <h1
              className="animate-rise animation-delay-1 font-display text-[clamp(4rem,18vw,8.4rem)] font-black leading-[0.86] tracking-normal text-white"
            >
              Trouve
              <span className="block text-neon drop-shadow-[0_0_28px_rgba(57,255,136,0.34)]">
                ton match.
              </span>
            </h1>
            <p
              className="animate-rise animation-delay-2 mt-7 max-w-2xl text-lg leading-8 text-white/85 sm:text-xl"
            >
              L'application qui connecte les joueurs et simplifie l'organisation
              des matchs.
            </p>
            <p
              className="animate-rise animation-delay-3 mt-3 inline-flex rounded-full border border-neon/18 bg-neon/8 px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-neon"
            >
              100% gratuit
            </p>


            <div className="animate-rise animation-delay-4">
              <SignupForm />
            </div>

            <div
              className="animate-rise animation-delay-5 mt-5 flex flex-col gap-3 sm:flex-row"
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
            </div>
          </div>

          <div
            className="animate-rise animation-delay-3 relative mx-auto w-full max-w-xl"
          >
            <div className="absolute inset-x-8 top-16 h-72 rounded-full bg-neon/20 blur-[80px]" />
            <div className="relative grid place-items-center">
              <PhoneMockup
                variant="join"
                title="Match ouvert prÃ¨s de toi"
                subtitle="Rejoindre"
                className="rotate-[-4deg]"
              />
              <div className="premium-border absolute -right-2 bottom-10 hidden w-52 rounded-[1.4rem] p-4 sm:block">
                <div className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
                  <Users size={18} className="text-neon" />
                  Ã‰quipe en cours
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
          </div>
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
                Organiser un match n'a jamais Ã©tÃ© aussi simple.
              </h2>
            </div>
              <p className="max-w-md text-base leading-7 text-white/85">
              CrÃ©e un match, trouve des joueurs ou rejoins une partie. Toute
              l'organisation au mÃªme endroit.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <PhoneMockup variant="create" title="CrÃ©e ton match" subtitle="CrÃ©ation" />
            <PhoneMockup variant="join" title="Rejoins en 1 tap" subtitle="Matchs" />
            <PhoneMockup variant="chat" title="Ã‰quipe synchronisÃ©e" subtitle="CommunautÃ©" />
          </div>
        </div>
      </section>

      <section className="relative z-10 px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {matchCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="premium-border rounded-[1.6rem] p-5"
                >
                  <div className="mb-8 grid h-12 w-12 place-items-center rounded-2xl bg-neon/12 text-neon">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-black leading-tight text-white">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-white/85">{card.text}</p>
                </article>
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
                CommunautÃ©
              </div>
              <h2 className="font-display text-3xl font-black leading-tight text-white sm:text-5xl">
                Rejoins les premiers joueurs FootMatch.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/85">
                FootMatch arrive bientÃ´t sur l'App Store et Google Play.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/85">
                Inscris-toi pour Ãªtre prÃ©venu du lancement officiel, accÃ©der Ã 
                l'application en avant-premiÃ¨re et suivre les prochaines
                Ã©volutions de FootMatch.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/85">
                Une Version 2 est dÃ©jÃ  en prÃ©paration avec de nouvelles
                fonctionnalitÃ©s pour simplifier encore davantage l'organisation
                des matchs amateurs.
              </p>
            </div>
            <div className="rounded-[1.6rem] border border-neon/18 bg-black/28 p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-neon/12 text-neon">
                  <Users size={22} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Liste d'attente</p>
                  <p className="text-sm text-white/85">Ouverture prochaine</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  "Disponible sur iPhone et Android",
                  "PrÃ©venu avant la sortie officielle",
                  "AccÃ¨s anticipÃ© aux futures Ã©volutions",
                  "Version 2 dÃ©jÃ  en prÃ©paration"
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.045] px-4 py-3 text-sm text-white/85"
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
            <img
              src="/brand/logo-footmatch-site.webp"
              alt="FootMatch"
              width={150}
              height={68}
              className="h-auto w-32"
            />
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/85">
              <a href="mailto:contact@footmatch.io" className="hover:text-neon">
                contact@footmatch.io
              </a>
              <a href="https://footmatch.io" className="hover:text-neon">
                footmatch.io
              </a>
            </div>
            <p className="mt-3 text-xs text-white/60">
              Â© 2026 FootMatchâ„¢. Tous droits rÃ©servÃ©s.
            </p>
          </div>
          <div className="flex flex-col gap-5 md:items-end">
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.instagram.com/footmatch.io/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 text-sm font-semibold text-white/85 transition hover:-translate-y-0.5 hover:border-neon/35 hover:text-neon"
              >
                <Instagram size={17} />
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@footmatch.io"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 text-sm font-semibold text-white/85 transition hover:-translate-y-0.5 hover:border-neon/35 hover:text-neon"
              >
                <span className="text-base font-black">â™ª</span>
                TikTok
              </a>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85 md:justify-end">
              <a href="/politique-confidentialite" className="hover:text-neon">
                Politique de confidentialitÃ©
              </a>
              <a href="/conditions-utilisation" className="hover:text-neon">
                Conditions d'utilisation
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
