import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-pitch px-5 py-8 text-white sm:px-8">
      <div className="noise" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition hover:text-neon"
        >
          <ArrowLeft size={16} />
          Retour
        </Link>

        <Image
          src="/brand/logo-footmatch-transparent.png"
          alt="FootMatch"
          width={260}
          height={118}
          priority
          className="mb-10 h-auto w-56"
        />

        <section className="premium-border rounded-[2rem] p-6 sm:p-8">
          <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-neon/12 text-neon">
            <Mail size={22} />
          </div>
          <h1 className="font-display text-4xl font-black sm:text-5xl">
            Contact
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/64">
            Une question, une ville à proposer ou une demande liée au lancement
            de FootMatch ? Tu peux nous écrire directement par email.
          </p>
          <a
            href="mailto:contact@footmatch.io"
            className="mt-8 inline-flex h-14 items-center justify-center rounded-2xl bg-neon px-6 text-sm font-black text-[#041007] shadow-glow transition hover:-translate-y-0.5 hover:bg-mint"
          >
            contact@footmatch.io
          </a>
        </section>
      </div>
    </main>
  );
}
