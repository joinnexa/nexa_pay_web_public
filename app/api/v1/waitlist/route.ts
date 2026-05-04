import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import path from "path";

const BACKEND_URL = process.env.BACKEND_URL;
const PROXY_TIMEOUT_MS = 5000;
const WAITLIST_SOURCE = "nexa_pay_web_public";
const ALLOWED_USER_TYPES = new Set([
  "consumer",
  "merchant",
  "investor",
]);

let hasWarnedBackendFallback = false;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateBody(body: unknown): { ok: true; data: Record<string, unknown> } | { ok: false; message: string } {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, message: "Invalid body" };
  }
  const o = body as Record<string, unknown>;
  const full_name = typeof o.full_name === "string" ? o.full_name.trim() : "";
  const phone_number = typeof o.phone_number === "string" ? o.phone_number.trim() : "";
  const email = typeof o.email === "string" ? o.email.trim() : "";
  const city = typeof o.city === "string" ? o.city.trim() : "";
  const how_will_use_nexa = typeof o.how_will_use_nexa === "string" ? o.how_will_use_nexa.trim().slice(0, 2000) : "";
  const rawUserType = typeof o.user_type === "string" ? o.user_type.trim().toLowerCase() : "";

  if (!full_name || full_name.length > 255) return { ok: false, message: "Full name is required" };
  if (!phone_number || phone_number.length > 50) return { ok: false, message: "Phone number is required" };
  if (!EMAIL_REGEX.test(email)) return { ok: false, message: "A valid email is required" };
  if (!city || city.length > 100) return { ok: false, message: "City is required" };
  if (rawUserType && !ALLOWED_USER_TYPES.has(rawUserType)) {
    return { ok: false, message: "Invalid user_type value" };
  }

  return {
    ok: true,
    data: {
      full_name,
      phone_number,
      email,
      city,
      how_will_use_nexa: how_will_use_nexa || undefined,
      user_type: rawUserType || undefined,
      source:
        typeof o.source === "string" && o.source.trim().length > 0
          ? o.source.trim().slice(0, 100)
          : WAITLIST_SOURCE,
    },
  };
}

async function saveLocally(entry: Record<string, unknown>): Promise<{ id: string; created_at: string }> {
  const id = crypto.randomUUID();
  const created_at = new Date().toISOString();
  const dir = path.join(process.cwd(), "data");
  const filePath = path.join(dir, "waitlist-entries.json");
  await mkdir(dir, { recursive: true });
  let list: Array<Record<string, unknown>> = [];
  try {
    const raw = await readFile(filePath, "utf-8");
    list = JSON.parse(raw);
  } catch {
    // file missing or invalid
  }
  list.push({ id, created_at, ...entry });
  await writeFile(filePath, JSON.stringify(list, null, 2), "utf-8");
  return { id, created_at };
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const validated = validateBody(body);
  if (!validated.ok) {
    const message = "message" in validated ? validated.message : "Invalid body";
    return NextResponse.json({ message }, { status: 400 });
  }
  const { data: payload } = validated;

  if (BACKEND_URL) {
    const base = BACKEND_URL.replace(/\/$/, "");
    const url = `${base}/api/v1/waitlist`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), PROXY_TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const data = await res.json().catch(() => ({}));
      return NextResponse.json(data, { status: res.status });
    } catch (err) {
      clearTimeout(timeout);
      if (!hasWarnedBackendFallback) {
        hasWarnedBackendFallback = true;
        console.warn("[waitlist] backend unreachable, using local fallback:", (err as Error).message);
      }
    }
  }

  const { id, created_at } = await saveLocally(payload);
  return NextResponse.json(
    {
      data: { id, ...payload, created_at },
      message: "Thank you for joining the waitlist.",
    },
    { status: 201 }
  );
}
