import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const root = path.resolve(import.meta.dirname, '..');
const env = { VERCEL_ENV: 'production', BLOB_STORE_ID: 'store_example123', PAMA_PUBLICATION_RELAY_SECRET: 'fixture-secret', BLOB_READ_WRITE_TOKEN: 'vercel_blob_rw_example123_fake' };
function load(entry, fetchMock = () => { throw Error('Unexpected network'); }, overrides = {}) {
  const cache = new Map();
  function moduleAt(file) {
    if (cache.has(file)) return cache.get(file).exports;
    const loadedModule = { exports: {} }; cache.set(file, loadedModule);
    const code = ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
    vm.runInNewContext(code, { module: loadedModule, exports: loadedModule.exports, Buffer, URL, Response, Request, TextEncoder, TextDecoder, AbortSignal, Uint8Array, __dirname: root,
      console: { error() {} }, process: { env: { ...env, ...overrides } }, fetch: fetchMock,
      require(name) { if (name.startsWith('@/')) return moduleAt('src/' + name.slice(2) + '.ts'); if (name === 'node:crypto') return require(name); if (name === 'next/server') return { NextResponse: Response }; throw Error('Unexpected dependency: ' + name); },
    }, { filename: file });
    return loadedModule.exports;
  }
  return moduleAt(entry);
}
const relay = 'src/app/api/portal-publication/route.ts', lead = 'src/app/api/lead/route.ts';
function upload(pathname = 'website/media/a.jpg', body = 'fixture', headers = {}) {
  return new Request('https://site.test/api/portal-publication?pathname=' + encodeURIComponent(pathname), { method: 'PUT', headers: { 'x-pama-publication-secret': 'fixture-secret', 'content-type': 'image/jpeg', ...headers }, body, ...(body instanceof ReadableStream ? { duplex: 'half' } : {}) });
}
function leadRequest(body, extra = {}) {
  return new Request('https://site.test/api/lead', { method: 'POST', headers: { origin: 'https://site.test', 'content-type': 'application/json', 'sec-fetch-site': 'same-origin', ...extra }, body, ...(body instanceof ReadableStream ? { duplex: 'half' } : {}) });
}
test('main-only Git policy suppresses nested feature and backup branches', () => {
  const rules = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'))).git.deploymentEnabled;
  const matcherModule = require('minimatch');
  const minimatch = matcherModule.minimatch ?? matcherModule;
  const enabled = branch => {
    const matched = Object.entries(rules).filter(([pattern]) => minimatch(branch, pattern));
    return matched.length === 0 || matched.some(([, allowed]) => allowed);
  };
  assert.equal(rules['**'], false);
  assert.equal(enabled('main'), true);
  for (const branch of ['codex/cost-controls', 'backup/deep/nested', 'feature-x', 'release']) assert.equal(enabled(branch), false);
});
test('Preview and Development cannot relay or ingest even with production credentials', async () => {
  for (const VERCEL_ENV of ['preview', 'development', 'unexpected']) {
    assert.equal((await load(relay, undefined, { VERCEL_ENV }).PUT(upload())).status, 403);
    assert.equal((await load(lead, undefined, { VERCEL_ENV }).POST(leadRequest('{}'))).status, 503);
  }
});
test('relay rejects traversal and encoded traversal before fetch', async () => {
  for (const pathname of ['website/../a.jpg', 'website/%2e%2e/a.jpg', 'website/a\\b.jpg', 'website//a.jpg', 'website/./a.jpg', 'website/directory/', 'outside/a.jpg']) {
    assert.equal((await load(relay).PUT(upload(pathname))).status, 400);
  }
});
test('relay store mismatch and malformed token fail closed without leaking credentials', async () => {
  for (const overrides of [{ BLOB_STORE_ID: 'other' }, { BLOB_READ_WRITE_TOKEN: 'invalid-secret' }]) {
    const result = await load(relay, undefined, overrides).PUT(upload());
    assert.equal(result.status, 503);
    assert.doesNotMatch(await result.text(), /fixture-secret|invalid-secret|vercel_blob_rw/);
  }
});
test('relay bounds undeclared streaming input and cancels it before any PUT', async () => {
  let cancelled = false;
  const stream = new ReadableStream({ pull(c) { c.enqueue(new Uint8Array(1024 * 1024)); }, cancel() { cancelled = true; } });
  assert.equal((await load(relay).PUT(upload(undefined, stream))).status, 413);
  assert.equal(cancelled, true);
});
test('lead rejects oversized stream and invalid declared size without upstream', async () => {
  const stream = new ReadableStream({ pull(c) { c.enqueue(new Uint8Array(12_001)); } });
  assert.equal((await load(lead).POST(leadRequest(stream))).status, 413);
  assert.equal((await load(lead).POST(leadRequest('{}', { 'content-length': '-1' }))).status, 413);
});
test('body boundary accepts exact limit; fails on byte rather than character count', async () => {
  const { readBoundedBody } = load('src/lib/bounded-request-body.ts');
  assert.equal((await readBoundedBody(new Request('https://site.test', { method: 'POST', body: 'abcd' }), 4)).length, 4);
  await assert.rejects(readBoundedBody(new Request('https://site.test', { method: 'POST', body: 'ééé' }), 4));
});
test('relay forbids redirect and applies timeout; wrong-store response cannot succeed', async () => {
  let calls = 0;
  const result = await load(relay, async (_url, init) => {
    calls++;
    assert.equal(init.redirect, 'error'); assert.ok(init.signal);
    return Response.json({ url: 'https://other.public.blob.vercel-storage.com/a.jpg', diagnostic: env.BLOB_READ_WRITE_TOKEN });
  }).PUT(upload());
  assert.equal(calls, 1); assert.equal(result.status, 502);
  assert.doesNotMatch(await result.text(), /vercel_blob_rw/);
});
test('oversized upstream acknowledgement causes one attempt and safe reconciliation failure', async () => {
  let calls = 0;
  const response = await load(relay, async () => { calls++; return new Response('x'.repeat(64_001)); }).PUT(upload());
  assert.equal(response.status, 502); assert.equal(calls, 1);
  assert.match((await response.json()).error, /Reconcile/);
});
test('wrong-path durable acknowledgement fails after exactly one attempt', async () => {
  let calls = 0;
  const result = await load(relay, async () => { calls++; return Response.json({ url: 'https://example123.public.blob.vercel-storage.com/website/media/other.jpg' }); }).PUT(upload());
  assert.equal(result.status, 502); assert.equal(calls, 1);
});
test('lead same-origin and schema failures never forward; success retains duplicate acknowledgement', async () => {
  assert.equal((await load(lead).POST(leadRequest('{}', { origin: 'https://evil.test' }))).status, 403);
  assert.equal((await load(lead).POST(leadRequest('{}'))).status, 400);
  let calls = 0;
  const handler = load(lead, async (_url, init) => { calls++; assert.equal(init.redirect, 'error'); assert.ok(init.signal); return Response.json({ data: { duplicate: true, leadReference: 'fixture-lead' } }); }, { PAMA_CORE_WEBSITE_INTAKE_URL: 'https://core.test/intake', PAMA_CORE_WEBSITE_INGEST_SECRET: 's'.repeat(32) });
  const result = await handler.POST(leadRequest(JSON.stringify({ submissionId: 'fixture-submission', submittedAt: new Date().toISOString(), formName: 'PRIVATE_ACCESS', leadType: 'BUYER', fullName: 'Fixture', email: 'fixture@example.test' })));
  assert.equal(result.status, 200); assert.equal(calls, 1); assert.equal((await result.json()).data.duplicate, true);
});
test('standalone root and existing image/CSP safety remain intact', async () => {
  const config = load('next.config.ts').default;
  assert.equal(config.turbopack.root, root); assert.equal(config.outputFileTracingRoot, root);
  assert.notEqual(config.images.unoptimized, true);
  const headers = (await config.headers())[0].headers;
  const csp = headers.find(x => x.key === 'Content-Security-Policy').value;
  for (const directive of ["object-src 'none'", "frame-ancestors 'none'", "connect-src 'self'", 'https://*.blob.vercel-storage.com']) assert.ok(csp.includes(directive));
});
