import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import os from "os";

export const runtime = "nodejs";

interface LeadPayload {
  name?: string;
  email?: string;
  phone?: string;
  groupSize?: string;
  departureCity?: string;
  travelMonth?: string;
  interests?: string[];
  message?: string;
  destination?: string;
  source?: string;
}

function isValid(lead: LeadPayload): boolean {
  if (!lead.name || lead.name.trim().length < 2) return false;
  const hasEmail = !!lead.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email);
  const hasPhone = !!lead.phone && lead.phone.replace(/\D/g, "").length >= 7;
  return hasEmail || hasPhone; // at least one way to reach them
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Sends the enquiry to the team's inbox via Resend. Fully optional — if the
// RESEND_* env vars aren't set, this is a no-op and leads still get persisted below.
async function sendLeadEmail(lead: LeadPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const apiUrl = process.env.RESEND_API_URL || "https://api.resend.com";
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.RESEND_TO_EMAIL;
  if (!apiKey || !from || !to) return;

  const rows: [string, string | undefined][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone / WhatsApp", lead.phone],
    ["Destination", lead.destination || lead.interests?.join(", ")],
    ["No. of People Travelling", lead.groupSize],
    ["Country / City of Departure", lead.departureCity],
    ["Likely Month of Travel", lead.travelMonth],
    ["Source", lead.source],
  ];

  const htmlRows = rows
    .filter(([, value]) => !!value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;color:#78716c;font-size:13px;">${escapeHtml(label)}</td><td style="padding:8px 12px;font-size:14px;font-weight:600;color:#1c1917;">${escapeHtml(String(value))}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="color:#1c1917;">New Enquiry — 365 Tours</h2>
      <table style="width:100%;border-collapse:collapse;background:#fafaf9;border-radius:8px;overflow:hidden;">
        ${htmlRows}
      </table>
    </div>
  `;

  try {
    await fetch(`${apiUrl}/emails`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `365 Tours Enquiries <${from}>`,
        to: [to],
        reply_to: lead.email || undefined,
        subject: `New Enquiry${lead.destination ? ` — ${lead.destination}` : ""} (${lead.name})`,
        html,
      }),
    });
  } catch {
    // Never fail the visitor's submission over an email delivery hiccup — the
    // lead is still persisted to file/webhook below.
  }
}

export async function POST(req: NextRequest) {
  let lead: LeadPayload;
  try {
    lead = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!isValid(lead)) {
    return NextResponse.json(
      { ok: false, error: "Please provide your name and an email or phone number." },
      { status: 422 }
    );
  }

  const record = {
    ...lead,
    receivedAt: new Date().toISOString(),
    userAgent: req.headers.get("user-agent") || "",
  };

  // Email the team via Resend (if configured) — the primary delivery path.
  await sendLeadEmail(lead);

  // Optional: forward to a webhook (Zapier, CRM, email service) if configured.
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
    } catch {
      // fall through to local persistence
    }
  }

  // Persist to a file. On a normal server this is ./data (durable); on serverless
  // (Vercel) the app dir is read-only, so fall back to the writable /tmp dir.
  // NOTE: /tmp is ephemeral — for durable capture set LEAD_WEBHOOK_URL to a CRM/
  // email/Sheet endpoint above.
  const line = JSON.stringify(record) + "\n";
  const targets = [
    path.join(process.cwd(), "data"),
    path.join(os.tmpdir(), "365tours-leads"),
  ];
  for (const dir of targets) {
    try {
      await fs.mkdir(dir, { recursive: true });
      await fs.appendFile(path.join(dir, "leads.jsonl"), line, "utf-8");
      break;
    } catch {
      // try the next target; never fail the user's request over storage
    }
  }

  return NextResponse.json({ ok: true });
}
