import { headers } from "next/headers";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const recent = (hits.get(ip) || []).filter((t) => t > windowStart);
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => t <= windowStart)) hits.delete(key);
    }
  }

  return recent.length > RATE_LIMIT_MAX;
}

const oneLine = (s) => String(s).replace(/[\r\n]+/g, " ").trim();

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req) {
  try {
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0].trim() ||
      headersList.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return json(
        { error: "Too many messages. Please try again later." },
        429
      );
    }

    let data;
    try {
      data = await req.json();
    } catch {
      return json({ error: "Invalid request." }, 400);
    }

    const { name, email, subject, message, company, t } = data || {};

    if (company) return json({ ok: true });

    const elapsed = Date.now() - Number(t);
    if (!t || Number.isNaN(elapsed) || elapsed < 3000) {
      return json({ error: "Submission rejected. Please try again." }, 400);
    }

    const cleanName = oneLine(name || "");
    const cleanEmail = oneLine(email || "");
    const cleanSubject = oneLine(subject || "");
    const cleanMessage = String(message || "").trim();

    if (!cleanName || cleanName.length > 100) {
      return json({ error: "Please enter a valid name." }, 400);
    }
    if (!cleanEmail || cleanEmail.length > 254 || !EMAIL_RE.test(cleanEmail)) {
      return json({ error: "Please enter a valid email address." }, 400);
    }
    if (!cleanSubject || cleanSubject.length > 150) {
      return json({ error: "Please enter a valid subject." }, 400);
    }
    if (!cleanMessage || cleanMessage.length < 10 || cleanMessage.length > 5000) {
      return json(
        { error: "Message must be between 10 and 5000 characters." },
        400
      );
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.CONTACT_TO || "contact@kotelek.dev";
    const from = process.env.CONTACT_FROM || user;

    if (!host || !user || !pass) {
      console.error("Contact form: SMTP credentials are not configured.");
      return json(
        { error: "The contact form is temporarily unavailable." },
        503
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"kotelek.dev contact" <${from}>`,
      to,
      replyTo: `"${cleanName}" <${cleanEmail}>`,
      subject: `[Contact] ${cleanSubject}`,
      text: `From: ${cleanName} <${cleanEmail}>\nIP: ${ip}\n\n${cleanMessage}`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;color:#171717;line-height:1.6">
          <h2 style="color:#8200db;margin:0 0 12px">New message from kotelek.dev</h2>
          <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
          <p style="margin:0 0 4px"><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
          <p style="margin:0 0 12px"><strong>Subject:</strong> ${escapeHtml(cleanSubject)}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:12px 0" />
          <p style="white-space:pre-wrap;margin:0">${escapeHtml(cleanMessage)}</p>
        </div>
      `,
    });

    return json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return json({ error: "Something went wrong. Please try again." }, 500);
  }
}
