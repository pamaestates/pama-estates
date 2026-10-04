import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

const SNAPSHOT_TABLE = "portal_publication_snapshots";
const MEDIA_TABLE = "portal_publication_media";

export type ActivePublicationSnapshot = {
  id: string;
  provider: string;
  xml: string;
  xml_sha256: string;
  envelope_sha256: string;
  source_revision: string;
  generated_at: string;
  approved_at: string;
  listing_references: unknown;
};

export type PublicationMediaRow = {
  id: string;
  provider: string;
  storage_bucket: string;
  storage_path: string;
  content_sha256: string;
  mime_type: string;
  file_size_bytes: number | null;
  active: boolean;
};

function requiredEnv(name: "PAMA_PUBLICATION_SUPABASE_URL" | "PAMA_PUBLICATION_SUPABASE_SERVICE_ROLE_KEY" | "PAMA_BAYUT_MEDIA_GATEWAY_SECRET") {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is not configured.`);
  return value;
}

function publicationSupabase() {
  const baseUrl = requiredEnv("PAMA_PUBLICATION_SUPABASE_URL").replace(/\/+$/, "");
  const key = requiredEnv("PAMA_PUBLICATION_SUPABASE_SERVICE_ROLE_KEY");
  return { baseUrl, key };
}

function serviceHeaders(key: string) {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
  };
}

export async function readActiveBayutSnapshot(): Promise<ActivePublicationSnapshot | null> {
  const { baseUrl, key } = publicationSupabase();
  const params = new URLSearchParams({
    select: "id,provider,xml,xml_sha256,envelope_sha256,source_revision,generated_at,approved_at,listing_references",
    provider: "eq.BAYUT",
    active: "eq.true",
    order: "approved_at.desc",
    limit: "1",
  });
  const response = await fetch(`${baseUrl}/rest/v1/${SNAPSHOT_TABLE}?${params.toString()}`, {
    method: "GET",
    headers: serviceHeaders(key),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Publication snapshot store returned HTTP ${response.status}.`);
  const rows = await response.json() as ActivePublicationSnapshot[];
  return rows[0] ?? null;
}

export async function readPublicationMedia(mediaId: string): Promise<PublicationMediaRow | null> {
  const { baseUrl, key } = publicationSupabase();
  const params = new URLSearchParams({
    select: "id,provider,storage_bucket,storage_path,content_sha256,mime_type,file_size_bytes,active",
    id: `eq.${mediaId}`,
    provider: "eq.BAYUT",
    active: "eq.true",
    limit: "1",
  });
  const response = await fetch(`${baseUrl}/rest/v1/${MEDIA_TABLE}?${params.toString()}`, {
    method: "GET",
    headers: serviceHeaders(key),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Publication media store returned HTTP ${response.status}.`);
  const rows = await response.json() as PublicationMediaRow[];
  return rows[0] ?? null;
}

export function expectedBayutMediaToken(media: Pick<PublicationMediaRow, "id" | "content_sha256">) {
  const secret = requiredEnv("PAMA_BAYUT_MEDIA_GATEWAY_SECRET");
  return createHmac("sha256", secret)
    .update(`BAYUT:${media.id}:${media.content_sha256.toLowerCase()}`, "utf8")
    .digest("hex");
}

export function verifyBayutMediaToken(media: Pick<PublicationMediaRow, "id" | "content_sha256">, suppliedToken: string) {
  const expected = expectedBayutMediaToken(media);
  if (!/^[a-f0-9]{64}$/i.test(suppliedToken)) return false;
  const left = Buffer.from(expected, "hex");
  const right = Buffer.from(suppliedToken, "hex");
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function downloadPublicationMedia(media: PublicationMediaRow) {
  const { baseUrl, key } = publicationSupabase();
  const bucket = encodeURIComponent(media.storage_bucket);
  const path = media.storage_path.split("/").map(encodeURIComponent).join("/");
  return fetch(`${baseUrl}/storage/v1/object/${bucket}/${path}`, {
    method: "GET",
    headers: serviceHeaders(key),
    cache: "no-store",
  });
}

export function publicationRelayConfigured() {
  return Boolean(
    process.env.PAMA_PUBLICATION_SUPABASE_URL?.trim()
    && process.env.PAMA_PUBLICATION_SUPABASE_SERVICE_ROLE_KEY?.trim(),
  );
}

export function bayutMediaGatewayConfigured() {
  return publicationRelayConfigured() && Boolean(process.env.PAMA_BAYUT_MEDIA_GATEWAY_SECRET?.trim());
}
