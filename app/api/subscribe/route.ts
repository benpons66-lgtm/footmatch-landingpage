import { NextResponse } from "next/server";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const { email } = (await request.json()) as { email?: string };
    const cleanEmail = email?.trim().toLowerCase() ?? "";

    if (!isValidEmail(cleanEmail)) {
      return NextResponse.json(
        { message: "Entre une adresse email valide." },
        { status: 422 }
      );
    }

    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;

    if (!formspreeEndpoint) {
      return NextResponse.json(
        { message: "Le formulaire n'est pas encore configuré côté serveur." },
        { status: 500 }
      );
    }

    const formspreeResponse = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: cleanEmail,
        subject: "Nouvelle inscription FootMatch",
        source: "Landing page FootMatch",
        submittedAt: new Date().toISOString()
      })
    });

    if (!formspreeResponse.ok) {
      return NextResponse.json(
        { message: "Impossible d'envoyer l'inscription pour le moment." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      message: "Merci, ton email a bien été pris en compte."
    });
  } catch {
    return NextResponse.json(
      { message: "Impossible d'envoyer ton email pour le moment." },
      { status: 500 }
    );
  }
}
