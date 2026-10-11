// Build-verification preload: abort Blob traffic before any network request.
const originalFetch = globalThis.fetch;
globalThis.fetch = function (input, init) {
  const value = typeof input === 'string' ? input : input.url || String(input);
  const url = new URL(value);
  if (url.hostname === 'blob.vercel-storage.com' || url.hostname.endsWith('.blob.vercel-storage.com') || (url.hostname === 'vercel.com' && url.pathname.startsWith('/api/blob'))) {
    throw new Error('Blob network is prohibited during local build verification');
  }
  return originalFetch.call(this, input, init);
};
