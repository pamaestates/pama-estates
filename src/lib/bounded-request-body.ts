/** Bound bytes while streaming, including requests without Content-Length. */
export class BodyLimitError extends Error {}

export async function readBoundedBody(message: Pick<Request, "body" | "headers">, maximum: number): Promise<Uint8Array> {
  const length = message.headers.get("content-length");
  if (length !== null && (!/^\d+$/.test(length) || Number(length) > maximum)) {
    throw new BodyLimitError("Invalid or oversized body length.");
  }
  if (!message.body) return new Uint8Array();
  const reader = message.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maximum) {
        await reader.cancel().catch(() => undefined);
        throw new BodyLimitError("Body exceeds the allowed size.");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes;
}
