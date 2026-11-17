import assert from 'node:assert/strict';
import test from 'node:test';
import { evaluateSnapshot, curlArguments } from '../scripts/check-pl-property-sync.mjs';
import { buildPolishPropertySyncReport } from '../src/lib/pl-property-sync.ts';

const fingerprint = p => JSON.stringify([p.title, p.description, p.amenities, p.highlights]);
const property = (reference = 'TEST-001') => ({ listingReference: reference, title: 'English', description: 'Public', amenities: [], highlights: [] });
const record = (p, overrides = {}) => ({ reference: p.listingReference, englishFingerprint: fingerprint(p), title: 'Polski tytuł', description: 'Polski opis', status: 'APPROVED', approvedAt: '2026-11-01T00:00:00Z', ...overrides });
const now = new Date('2026-11-17T00:00:00.000Z');
const feed = (properties, date = '2026-11-16T00:00:00.000Z') => ({ schemaVersion: 1, generatedAt: date, properties });
const editor = records => ({ version: 1, records });
const check = (f, e) => evaluateSnapshot(f, e, buildPolishPropertySyncReport, fingerprint, now);

test('current and fresh gives PASS', () => {
  const p = property();
  assert.deepEqual({ result: check(feed([p]), editor([record(p)])).result, current: check(feed([p]), editor([record(p)])).CURRENT }, { result: 'PASS', current: 1 });
});
test('new listing is MISSING and requires review', () => {
  const result = check(feed([property()]), editor([]));
  assert.equal(result.MISSING, 1); assert.equal(result.result, 'REVIEW_REQUIRED');
});
test('source change is STALE and requires review', () => {
  const p = property(); const stale = record(p); p.description = 'Modified';
  const result = check(feed([p]), editor([stale]));
  assert.equal(result.STALE, 1); assert.equal(result.result, 'REVIEW_REQUIRED');
});
test('duplicate editorial entries are CONFLICT', () => {
  const p = property(); const r = record(p);
  assert.equal(check(feed([p]), editor([r, r])).CONFLICT, 1);
});
test('old feed fails closed even when all fingerprints match', () => {
  const p = property(); const result = check(feed([p], '2026-10-22T17:53:18.516Z'), editor([record(p)]));
  assert.equal(result.CURRENT, 1); assert.equal(result.sourceFresh, false);
  assert.equal(result.result, 'REVIEW_REQUIRED');
});
test('empty, malformed, sentinel and future feeds fail', () => {
  const p = property(); const e = editor([record(p)]);
  for (const f of [feed([]), { ...feed([p]), schemaVersion: 2 }, feed([p], '1970-01-01T00:00:00.000Z'), feed([p], '2026-12-01T00:00:00Z'), feed([{}])]) {
    assert.throws(() => check(f, e));
  }
});
test('missing editorial store and broken comparator fail closed', () => {
  const p = property();
  assert.throws(() => check(feed([p]), { version: 2, records: [] }));
  assert.throws(() => evaluateSnapshot(feed([p]), editor([record(p)]), () => [], fingerprint, now));
});
test('curl uses fixed HTTPS endpoint without following redirects', () => {
  const args = curlArguments();
  assert.equal(args.at(-1), 'https://www.pamaestates.com/feeds/properties.json');
  assert.equal(args.includes('--location'), false);
  assert.throws(() => curlArguments('invalid-ip'));
  assert.ok(curlArguments('216.150.1.193').includes('--resolve'));
});
test('report does not mutate source data', () => {
  const p = Object.freeze(property());
  const r = Object.freeze(record(p));
  check(feed([p]), editor([r]));
  assert.equal(p.title, 'English');
});
