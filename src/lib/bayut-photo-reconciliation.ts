import { createHash } from "node:crypto";
import { BodyLimitError, readBoundedBody } from "@/lib/bounded-request-body";
export type PhotoReconciliationResult = { outcome: "NOT_FOUND" | "EXACT_MATCH" | "MISMATCH" | "UNCERTAIN"; url?: string };
function photoContent(bytes: Uint8Array, type: string) {
  if (type === "image/jpeg") return bytes.length >= 5 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255 && bytes.at(-2) === 255 && bytes.at(-1) === 217;
  if (type === "image/png") return bytes.length >= 20 && Buffer.from(bytes.subarray(0, 8)).equals(Buffer.from([137,80,78,71,13,10,26,10]));
  return type === "image/webp" && bytes.length >= 12 && Buffer.from(bytes.subarray(0,4)).toString() === "RIFF" && Buffer.from(bytes.subarray(8,12)).toString() === "WEBP" && new DataView(bytes.buffer, bytes.byteOffset).getUint32(4,true) + 8 === bytes.length;
}
// Exact public CDN GET only. No Blob SDK read/list/write or discovery call.
export async function reconcilePublicBayutPhoto(input: { storeId: string; pathname: string; contentType: string; sha256: string }): Promise<PhotoReconciliationResult> {
  const url = `https://${input.storeId}.public.blob.vercel-storage.com/${input.pathname}`;
  try {
    const response = await fetch(url, { cache: "no-store", headers: { "cache-control": "no-cache" }, redirect: "error", signal: AbortSignal.timeout(15000) });
    if (response.url !== url) return { outcome: "MISMATCH" };
    if (response.status === 404) { await response.body?.cancel(); return { outcome: "NOT_FOUND" }; }
    if (response.status !== 200) { await response.body?.cancel(); return { outcome: "UNCERTAIN" }; }
    if ((response.headers.get("content-type") ?? "").split(";")[0].trim().toLowerCase() !== input.contentType) { await response.body?.cancel(); return { outcome: "MISMATCH" }; }
    const bytes = await readBoundedBody(response, 25 * 1024 * 1024);
    if (!bytes.length || !photoContent(bytes,input.contentType) || createHash("sha256").update(bytes).digest("hex") !== input.sha256) return { outcome: "MISMATCH" };
    return { outcome: "EXACT_MATCH", url };
  } catch (error) { return { outcome: error instanceof BodyLimitError ? "MISMATCH" : "UNCERTAIN" }; }
}
