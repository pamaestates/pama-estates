import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const root = path.resolve(import.meta.dirname, '..');
const env = { BLOB_STORE_ID: 'store_example123', PAMA_PUBLICATION_RELAY_SECRET: 'mock-secret', BLOB_READ_WRITE_TOKEN: 'vercel_blob_rw_example123_fake' };
// Each module gets a mock fetch and isolated environment. No real fetch is reachable.
function load(entry, fetchMock, overrides = {}) {
  const modules = new Map();
  function moduleAt(file) {
    const full = path.join(root, file);
    if (modules.has(full)) return modules.get(full).exports;
    const loadedModule = { exports: {} }; modules.set(full, loadedModule);
    const code = ts.transpileModule(fs.readFileSync(full, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
    const sandbox = { module: loadedModule, exports: loadedModule.exports, Buffer, URL, Headers, Response, Request, TextEncoder, TextDecoder, AbortSignal, Uint8Array, setTimeout, console: { error() {} }, process: { env: { ...env, ...overrides } }, fetch: fetchMock,
      require(name) { if (name.startsWith('@/')) return moduleAt('src/' + name.slice(2) + '.ts'); if (name === 'node:crypto') return require(name); throw new Error('Unexpected dependency: ' + name); } };
    vm.runInNewContext(code, sandbox, { filename: file }); return loadedModule.exports;
  }
  return moduleAt(entry);
}

const relayRoute = 'src/app/api/portal-publication/route.ts';
const claimModule = 'src/lib/bounded-publication-claim.ts';
const secret = 'local-test-claim-key-32-characters-only';
const pathname = 'bayut/media/PAMA-R-2610-007/photo-1.jpg';
const bytes = new TextEncoder().encode('local-fixture').buffer;
const hash = require('node:crypto').createHash('sha256').update(Buffer.from(bytes)).digest('hex');
function claim(overrides = {}) { const now = Math.floor(Date.now()/1000); return {runId:'test-run',listingId:'test-listing',listingReference:'PAMA-R-2610-007',pathname,sha256:hash,contentType:'image/jpeg',issuedAt:now,expiresAt:now+120,...overrides}; }
function headers(c=claim()) { return load(claimModule,()=>{throw Error('network');},{PAMA_BOUNDED_PUBLICATION_CLAIM_SECRET:secret}).signBoundedPublicationClaim(c); }
function raw(c, changes={}) { const values=[1,'BAYUT_MEDIA_INITIALIZATION',c.runId,c.listingId,c.listingReference,c.pathname,c.sha256,c.contentType,c.issuedAt,c.expiresAt,c.intent ?? "WRITE"]; for(const [k,v] of Object.entries(changes)) values[Number(k)]=v; const payload=JSON.stringify(values); return {'x-pama-bounded-claim':Buffer.from(payload).toString('base64url'),'x-pama-bounded-signature':require('node:crypto').createHmac('sha256',secret).update('pama-bounded-publication:v1:'+payload).digest('hex')}; }
function request(h=headers(),path=pathname,body=bytes,type='image/jpeg') { return new Request('https://website.test/api/portal-publication?pathname='+encodeURIComponent(path),{method:'PUT',headers:{'x-pama-publication-secret':'mock-secret','content-type':type,...h},body}); }
function relay(overrides={},fail=false) { const calls=[];const logs=[]; const r=load(relayRoute,async(...args)=>{calls.push(args);if(fail)throw Error('sensitive-upstream-value');const p=new URL(args[0]).searchParams.get('pathname');return Response.json({url:'https://example123.public.blob.vercel-storage.com/'+p});},{PAMA_BOUNDED_PUBLICATION_CLAIM_SECRET:secret,...overrides});return {...r,calls,logs}; }
test('canonical wire vector is stable and verifies independently',()=>{const vector=JSON.parse(fs.readFileSync(path.join(root,'tests/bounded-publication-claim.vector.json'),'utf8'));const v=vector.values,c={runId:v[2],listingId:v[3],listingReference:v[4],pathname:v[5],sha256:v[6],contentType:v[7],issuedAt:v[8],expiresAt:v[9]};const m=load(claimModule,()=>{throw Error('network');},{PAMA_BOUNDED_PUBLICATION_CLAIM_SECRET:vector.secret});const signed=m.signBoundedPublicationClaim(c,v[8]);assert.equal(signed['x-pama-bounded-signature'],vector.signature);assert.equal(m.verifyBoundedPublicationClaim(new Headers(signed),pathname,'image/jpeg',bytes,v[8]),'WRITE');});
test('valid exact claim executes at most one mocked Blob PUT without forwarding claims',async()=>{const r=relay();const res=await r.PUT(request());assert.equal(res.status,200);assert.equal(r.calls.length,1);assert.equal(r.calls[0][1].method,'PUT');assert.equal(r.calls[0][1].headers['x-pama-bounded-claim'],undefined);assert.equal((await res.text()).includes(secret),false);});
const invalidCases=[
 ['missing claim / generic relay secret alone',()=>request({})],
 ['invalid signature',()=>request({...headers(),'x-pama-bounded-signature':'0'.repeat(64)})],
 ['expired',()=>request(raw(claim({issuedAt:Math.floor(Date.now()/1000)-180,expiresAt:Math.floor(Date.now()/1000)-60})))],
 ['future',()=>request(raw(claim({issuedAt:Math.floor(Date.now()/1000)+60,expiresAt:Math.floor(Date.now()/1000)+120})))],
 ['excess lifetime',()=>request(raw(claim({expiresAt:Math.floor(Date.now()/1000)+121})))],
 ['invalid timestamps',()=>request(raw(claim({issuedAt:1.5})))],
 ['changed pathname',()=>request(headers(),pathname.replace('photo-1','photo-2'))],
 ['changed body',()=>request(headers(),pathname,'changed')],
 ['changed content type',()=>request(headers(),pathname,bytes,'image/png')],
 ['unsupported operation',()=>request(raw(claim(),{1:'WEBSITE_INITIALIZATION'}))],
 ['unsupported version',()=>request(raw(claim(),{0:2}))],
 ['malformed',()=>request({'x-pama-bounded-claim':'not-json','x-pama-bounded-signature':'a'.repeat(64)})],
 ['outside exact listing namespace',()=>request(raw(claim({pathname:'bayut/media/OTHER/photo-1.jpg'})), 'bayut/media/OTHER/photo-1.jpg')],
 ['traversal',()=>request(raw(claim({pathname:'bayut/media/PAMA-R-2610-007/../photo-1.jpg'})), 'bayut/media/PAMA-R-2610-007/../photo-1.jpg')],
];
for(const [name,make] of invalidCases) test(name+' rejects before ANY Blob call with sanitized error',async()=>{const r=relay(),res=await r.PUT(make());assert.ok([400,403].includes(res.status));assert.equal(r.calls.length,0);const body=await res.text();assert.equal(body.includes(secret),false);assert.equal(body.includes('x-pama-bounded'),false);});
test('missing / short / reused signing key fails closed',async()=>{for(const value of ['', 'short', 'mock-secret']) {const r=relay({PAMA_BOUNDED_PUBLICATION_CLAIM_SECRET:value});const res=await r.PUT(request());assert.equal(res.status,503);assert.equal(r.calls.length,0);}});
test('ambiguous upload requires reconciliation without retry or secret disclosure',async()=>{const r=relay({},true);const res=await r.PUT(request());assert.equal(res.status,502);assert.equal(r.calls.length,1);const body=await res.text();assert.match(body,/Reconcile/);assert.equal(body.includes('sensitive-upstream-value'),false);assert.equal(body.includes(secret),false);});
test('stable XML and direct immutable candidate retain existing authorization without signing key',async()=>{for(const p of ['bayut/feed.xml','bayut/candidates/'+hash+'.xml']) {const r=relay({PAMA_BOUNDED_PUBLICATION_CLAIM_SECRET:''});const res=await r.PUT(request({},p,bytes,'application/xml'));assert.equal(res.status,200);assert.equal(r.calls.length,p==='bayut/feed.xml'?2:1);}});
test('website media still uses its existing authorization without claim key',async()=>{const r=relay({PAMA_BOUNDED_PUBLICATION_CLAIM_SECRET:''});assert.equal((await r.PUT(request({},'website/media/photo.jpg'))).status,200);assert.equal(r.calls.length,1);});

test('signed verification-only handshake authorizes exact object with ZERO Blob calls',async()=>{const r=relay();const res=await r.PUT(request(headers(claim({intent:'VERIFY_ONLY'}))));assert.equal(res.status,200);assert.deepEqual(await res.json(),{ok:true,verificationOnly:true,authorized:true});assert.equal(r.calls.length,0);});
test('verification-only intent cannot be upgraded to WRITE without invalidating HMAC',async()=>{const h=headers(claim({intent:'VERIFY_ONLY'}));const v=JSON.parse(Buffer.from(h['x-pama-bounded-claim'],'base64url'));v[10]='WRITE';h['x-pama-bounded-claim']=Buffer.from(JSON.stringify(v)).toString('base64url');const r=relay();assert.equal((await r.PUT(request(h))).status,403);assert.equal(r.calls.length,0);});
