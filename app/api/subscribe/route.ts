import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const notifyTo = process.env.NOTIFY_TO || smtpUser || "contact@footmatch.io";

    if (!smtpHost || !smtpUser || !smtpPass) {
      return NextResponse.json(
        { message: "Le formulaire n'est pas encore configuré côté serveur." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    await transporter.sendMail({
      from: `"FootMatch" <${smtpUser}>`,
      to: notifyTo,
      replyTo: cleanEmail,
      subject: "Nouvelle inscription FootMatch",
      text: [
        "Nouvelle inscription à la liste d'attente FootMatch.",
        "",
        `Email : ${cleanEmail}`,
        `Date : ${new Date().toISOString()}`
      ].join("\n")
    });

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
