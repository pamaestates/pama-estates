/** Server-only deterministic URLs: never sends a credential to public storage. */
export function publicBlobStoreId(env: NodeJS.ProcessEnv = process.env): string {
  const configured = (env.BLOB_STORE_ID ?? "").trim().replace(/^store_/, "");
  const token = (env.BLOB_READ_WRITE_TOKEN ?? "").trim();
  const tokenId = token ? /^vercel_blob_rw_([A-Za-z0-9-]+)_.+$/.exec(token)?.[1] : undefined;
  if (token && !tokenId) throw new Error("Invalid Blob store configuration.");
  const id = tokenId || configured;
  if (!/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(id) || (configured && tokenId && configured.toLowerCase() !== tokenId.toLowerCase())) throw new Error("Invalid Blob store configuration.");
  return id.toLowerCase();
}
export function publicBlobUrl(pathname: string, env: NodeJS.ProcessEnv = process.env): string {
  if (pathname !== "website/properties.json" && pathname !== "bayut/feed.xml" && !/^bayut\/candidates\/[a-f0-9]{64}\.xml$/.test(pathname)) throw new Error("Invalid public feed pathname.");
  return "https://" + publicBlobStoreId(env) + ".public.blob.vercel-storage.com/" + pathname;
}
