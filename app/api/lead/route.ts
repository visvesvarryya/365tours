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
