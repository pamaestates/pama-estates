import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 24_000;
const MIN_SECRET_LENGTH = 32;
const MIN_MOBILE_DIGITS = 7;
const MAX_MOBILE_DIGITS = 15;

const ALLOWED_FORM_NAMES = new Set([
  "PRIVATE_ACCESS",
  "PRIVATE_ACCESS_INVESTOR",
  "PRIVATE_ACCESS_END_USER",
  "BROKER_COLLABORATION",
  "SELL_WITH_US",
  "RENT_WITH_US",
  "OWNER_INQUIRY",
  "PROPERTY_REVIEW",
]);

const ALLOWED_LEAD_TYPES = new Set([
  "BUYER",
  "SELLER",
  "LANDLORD",
  "BROKER",
  "OTHER",
]);

type PublicLeadPayload = {
  submissionId?: unknown;
  submittedAt?: unknown;
  formName?: unknown;
  leadType?: unknown;
  fullName?: unknown;
  email?: unknown;
  mobile?: unknown;
  message?: unknown;
  landingPage?: unknown;
  utmSource?: unknown;
  utmMedium?: unknown;
  utmCampaign?: unknown;
  utmContent?: unknown;
  utmTerm?: unknown;
};

type CoreIntakeResponse = {
  data?: {
    duplicate?: boolean;
    leadReference?: string;
  };
};

function text(value: unknown, max: number) {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max) return undefined;
  return trimmed;
}

function validEmail(value: string | undefined) {
  if (!value) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validMobile(value: string | undefined) {
  if (!value) return true;
  const digits = value.replace(/\D/g, "");
  return digits.length >= MIN_MOBILE_DIGITS && digits.length <= MAX_MOBILE_DIGITS;
}

function hasContactMethod(email: string | undefined, mobile: string | undefined) {
  return Boolean(email || mobile);
}

function validIntakeUrl(value: string | undefined) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    const localHttp =
      url.protocol === "http:" &&
      (url.hostname === "localhost" || url.hostname === "127.0.0.1");
    if (url.protocol !== "https:" && !localHttp) return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

function error(code: string, status: number) {
  return NextResponse.json({ error: { code } }, { status });
}

export async function POST(request: Request) {
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return error("PAYLOAD_TOO_LARGE", 413);
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return error("INVALID_BODY", 400);
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return error("PAYLOAD_TOO_LARGE", 413);
  }

  let incoming: PublicLeadPayload;
  try {
    incoming = JSON.parse(rawBody) as PublicLeadPayload;
  } catch {
    return error("INVALID_JSON", 400);
  }

  const submissionId = text(incoming.submissionId, 160);
  const submittedAt = text(incoming.submittedAt, 80);
  const formName = text(incoming.formName, 160);
  const leadType = text(incoming.leadType, 40);
  const fullName = text(incoming.fullName, 240);
  const emailAddress = text(incoming.email, 320)?.toLowerCase();
  const mobile = text(incoming.mobile, 60);
  const message = text(incoming.message, 5000);
  const landingPage = text(incoming.landingPage, 2048);

  if (
    !submissionId ||
    !submittedAt ||
    Number.isNaN(Date.parse(submittedAt)) ||
    !formName ||
    !ALLOWED_FORM_NAMES.has(formName) ||
    !leadType ||
    !ALLOWED_LEAD_TYPES.has(leadType) ||
    !fullName ||
    !hasContactMethod(emailAddress, mobile) ||
    !validEmail(emailAddress) ||
    !validMobile(mobile)
  ) {
    return error("INVALID_PAYLOAD", 400);
  }

  const intakeUrl = validIntakeUrl(process.env.PAMA_CORE_WEBSITE_INTAKE_URL?.trim());
  const secret = process.env.PAMA_CORE_WEBSITE_INGEST_SECRET?.trim();
  if (!intakeUrl || !secret || secret.length < MIN_SECRET_LENGTH) {
    return error("CRM_CAPTURE_UNAVAILABLE", 503);
  }

  const upstreamPayload = {
    submissionId,
    submittedAt,
    formName,
    leadType,
    contactType: "PERSON",
    fullName,
    ...(emailAddress ? { email: emailAddress } : {}),
    ...(mobile ? { mobile } : {}),
    ...(message ? { message } : {}),
    ...(landingPage ? { landingPage } : {}),
    ...(text(incoming.utmSource, 300) ? { utmSource: text(incoming.utmSource, 300) } : {}),
    ...(text(incoming.utmMedium, 300) ? { utmMedium: text(incoming.utmMedium, 300) } : {}),
    ...(text(incoming.utmCampaign, 300) ? { utmCampaign: text(incoming.utmCampaign, 300) } : {}),
    ...(text(incoming.utmContent, 300) ? { utmContent: text(incoming.utmContent, 300) } : {}),
    ...(text(incoming.utmTerm, 300) ? { utmTerm: text(incoming.utmTerm, 300) } : {}),
  };

  try {
    const response = await fetch(intakeUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(upstreamPayload),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) {
      console.error("PAMA Core website intake rejected", response.status);
      return error("CRM_CAPTURE_FAILED", 502);
    }

    const result = (await response.json().catch(() => null)) as CoreIntakeResponse | null;
    const leadReference = text(result?.data?.leadReference, 160);
    if (!leadReference) {
      console.error("PAMA Core website intake returned an invalid success response");
      return error("CRM_CAPTURE_FAILED", 502);
    }

    return NextResponse.json({
      data: {
        captured: true,
        duplicate: Boolean(result?.data?.duplicate),
        leadReference,
      },
    });
  } catch (caught) {
    console.error(
      "PAMA Core website intake unavailable",
      caught instanceof Error ? caught.name : "UnknownError",
    );
    return error("CRM_CAPTURE_FAILED", 502);
  }
}
