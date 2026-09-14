import { profile } from "@/content/site";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  if (field(data.company, 200)) return Response.json({ ok: true });

  const name = field(data.name, 100).replace(/\s+/g, " ");
  const email = field(data.email, 200);
  const message = field(data.message, 5000);
  if (!name || !EMAIL.test(email) || message.length < 10) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ error: "unconfigured" }, { status: 500 });

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>",
      to: [profile.email],
      reply_to: email,
      subject: `Portfolio — ${name}`,
      text: `${name} <${email}>\n\n${message}`,
    }),
  });

  if (!response.ok) return Response.json({ error: "send" }, { status: 502 });
  return Response.json({ ok: true });
}
