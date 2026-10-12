import { createHash, createHmac, timingSafeEqual } from "node:crypto";

// Protocol v1 is an ordered JSON tuple, never caller-controlled object key ordering.
// Keep this module identical in Core and the website relay; covered by a fixed wire vector.
export const CLAIM_HEADER = "x-pama-bounded-claim";
export const SIGNATURE_HEADER = "x-pama-bounded-signature";
export const CLAIM_TTL_SECONDS = 120;
export type BoundedPublicationClaim = {
  runId: string; listingId: string; listingReference: string; pathname: string;
  sha256: string; contentType: string; issuedAt: number; expiresAt: number; intent?: "WRITE" | "VERIFY_ONLY" | "RECONCILE_ONLY";
};
const OPERATION = "BAYUT_MEDIA_INITIALIZATION";
const DOMAIN = "pama-bounded-publication:v1:";
function tuple(c: BoundedPublicationClaim) {
  return [1, OPERATION, c.runId, c.listingId, c.listingReference, c.pathname, c.sha256, c.contentType, c.issuedAt, c.expiresAt, c.intent ?? "WRITE"];
}
function valid(c: BoundedPublicationClaim, now: number) {
  return (!c.intent || ["WRITE", "VERIFY_ONLY", "RECONCILE_ONLY"].includes(c.intent)) && /^[A-Za-z0-9_-]{1,128}$/.test(c.runId) && /^[A-Za-z0-9_-]{1,128}$/.test(c.listingId) &&
    /^[A-Z0-9-]{1,80}$/.test(c.listingReference) &&
    new RegExp(`^bayut/media/${c.listingReference}/[A-Za-z0-9_-]+\\.(jpg|png|webp)$`).test(c.pathname) &&
    /^[a-f0-9]{64}$/.test(c.sha256) && ["image/jpeg", "image/png", "image/webp"].includes(c.contentType) &&
    Number.isSafeInteger(c.issuedAt) && Number.isSafeInteger(c.expiresAt) && c.issuedAt > 0 &&
    c.issuedAt <= now && c.expiresAt > now && c.expiresAt > c.issuedAt &&
    c.expiresAt - c.issuedAt <= CLAIM_TTL_SECONDS;
}
function key() {
  const secret = process.env.PAMA_BOUNDED_PUBLICATION_CLAIM_SECRET?.trim() ?? "";
  if (Buffer.byteLength(secret) < 32 || secret === process.env.PAMA_PUBLICATION_RELAY_SECRET?.trim()) {
    throw new Error("Bounded publication claim configuration is unavailable.");
  }
  return secret;
}
function mac(payload: string, secret: string) {
  return createHmac("sha256", secret).update(DOMAIN + payload).digest();
}
export function signBoundedPublicationClaim(c: BoundedPublicationClaim, now = Math.floor(Date.now() / 1000)) {
  if (!valid(c, now)) throw new Error("Invalid bounded publication claim scope.");
  const payload = JSON.stringify(tuple(c));
  return { [CLAIM_HEADER]: Buffer.from(payload).toString("base64url"), [SIGNATURE_HEADER]: mac(payload, key()).toString("hex") };
}
export function verifyBoundedPublicationClaim(headers: Headers, pathname: string, contentType: string, body: ArrayBuffer, now = Math.floor(Date.now() / 1000)) {
  const secret = key(); // Configuration failures stay distinct from untrusted input.
  try {
    const encoded = headers.get(CLAIM_HEADER) ?? "", signature = headers.get(SIGNATURE_HEADER) ?? "";
    if (!/^[A-Za-z0-9_-]{1,4096}$/.test(encoded) || !/^[a-f0-9]{64}$/.test(signature)) return false;
    const decoded = Buffer.from(encoded, "base64url");
    if (decoded.toString("base64url") !== encoded) return false;
    const payload = decoded.toString("utf8"), values: unknown = JSON.parse(payload);
    if (!Array.isArray(values) || values.length !== 11 || values[0] !== 1 || values[1] !== OPERATION ||
      values.slice(2, 8).some((v) => typeof v !== "string") || typeof values[8] !== "number" || typeof values[9] !== "number" || !["WRITE", "VERIFY_ONLY", "RECONCILE_ONLY"].includes(values[10])) return false;
    const c: BoundedPublicationClaim = { runId: values[2], listingId: values[3], listingReference: values[4], pathname: values[5], sha256: values[6], contentType: values[7], issuedAt: values[8], expiresAt: values[9], intent: values[10] };
    if (JSON.stringify(tuple(c)) !== payload || !valid(c, now) || c.pathname !== pathname || c.contentType !== contentType) return false;
    if (!timingSafeEqual(mac(payload, secret), Buffer.from(signature, "hex"))) return false;
    return createHash("sha256").update(new Uint8Array(body)).digest("hex") === c.sha256 ? c.intent : false;
  } catch {
    return false;
  }
}
