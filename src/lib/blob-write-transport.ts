import { put } from "@vercel/blob";

// Pinned SDK 2.8.1 reads this process-wide control per request. Never temporarily
// restore it: concurrent requests must not see the SDK's default ten retries.
process.env.VERCEL_BLOB_RETRIES = "0";
export async function putPublicationObject(input: { pathname: string; body: ArrayBuffer; contentType: string; isFeed: boolean; token?: string; oidcToken?: string; storeId: string }) {
  if (process.env.VERCEL_BLOB_RETRIES !== "0") throw new Error("Publication retry protection unavailable.");
  return put(input.pathname, input.body, {
    access: "public", addRandomSuffix: false, allowOverwrite: true, multipart: false,
    contentType: input.contentType, cacheControlMaxAge: input.isFeed ? 60 : 31536000,
    ...(input.token ? { token: input.token, oidcToken: "" } : { oidcToken: input.oidcToken, storeId: `store_${input.storeId}` }),
    abortSignal: AbortSignal.timeout(15000),
  });
}
