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

// The SDK uses undici directly, so guarding global fetch alone is insufficient.
if (typeof require === 'function') {
  // CommonJS --require preload must install the guard synchronously before SDK imports.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const undici = require('undici');
  const dispatcher = undici.getGlobalDispatcher();
  class NoBlobDispatcher extends undici.Dispatcher {
    dispatch(options, handler) {
      const url = new URL(String(options.path), String(options.origin));
      if (url.hostname === 'blob.vercel-storage.com' || url.hostname.endsWith('.blob.vercel-storage.com') || (url.hostname === 'vercel.com' && url.pathname.startsWith('/api/blob'))) {
        handler.onError(new Error('Blob network is prohibited during local build verification'));
        return false;
      }
      return dispatcher.dispatch(options, handler);
    }
  }
  undici.setGlobalDispatcher(new NoBlobDispatcher());
}
