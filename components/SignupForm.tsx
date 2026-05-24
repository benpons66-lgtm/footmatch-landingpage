"use client";

import { FormEvent, useState } from "react";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setFormState("error");
      setMessage("Entre une adresse email valide.");
      return;
    }

    setFormState("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: trimmedEmail })
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue.");
      }

      setEmail("");
      setFormState("success");
      setMessage(data.message || "Merci, ton email a bien été pris en compte.");
    } catch (error) {
      setFormState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Impossible d'envoyer ton email pour le moment."
      );
    }
  }

  return (
    <>
      <form
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
          className="h-14 min-w-0 flex-1 rounded-2xl border border-transparent bg-black/25 px-5 text-base text-white outline-none transition placeholder:text-white/70 focus:border-neon/45"
        />
        <button
          type="submit"
          disabled={formState === "loading"}
          className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-neon px-5 text-sm font-black text-[#041007] shadow-glow transition hover:-translate-y-0.5 hover:bg-mint disabled:cursor-wait disabled:opacity-75 sm:px-6"
        >
          {formState === "loading" ? "Inscription..." : "Être informé du lancement"}
          <span aria-hidden="true" className="text-lg leading-none">
            →
          </span>
        </button>
      </form>
      <p className="mt-3 max-w-2xl text-xs leading-5 text-white/60">
        En t'inscrivant, tu acceptes d'être contacté concernant le lancement de
        FootMatch.
      </p>
      {message && (
        <p
          aria-live="polite"
          className={`mt-3 max-w-2xl text-sm ${
            formState === "error" ? "text-red-300" : "text-neon"
          }`}
        >
          {message}
        </p>
      )}
    </>
  );
}
