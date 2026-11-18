import assert from 'node:assert/strict';
import test from 'node:test';
import { evaluateSnapshot, curlArguments, summarizeReviewQueue, run } from '../scripts/check-pl-property-sync.mjs';
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

test('review queue reports safe references and reasons, never marketing text or fingerprints', () => {
  const q = summarizeReviewQueue([{
    reference: 'PAMA-S-2610-001', reason: 'SOURCE_CHANGED', status: 'DRAFT',
    title: 'Confidential placeholder', description: 'Private text must not appear',
    englishFingerprint: 'Do not expose the source fingerprint',
  }]);
  assert.equal(q.count, 1);
  assert.deepEqual(q.items, [{ reference: 'PAMA-S-2610-001', reason: 'SOURCE_CHANGED', status: 'DRAFT' }]);
  assert.doesNotMatch(JSON.stringify(q), /Private text|fingerprint|Confidential placeholder/);
});

test('review queue refuses unsafe identifiers, unexpected status and reason', () => {
  for (const item of [
    { reference: 'A\n```', reason: 'NO_RECORD', status: 'DRAFT' },
    { reference: 'SAFE-1', reason: 'NO_RECORD', status: 'APPROVED' },
    { reference: 'SAFE-1', reason: 'DUPLICATE_EDITORIAL_RECORD', status: 'DRAFT' },
  ]) {
    assert.throws(() => summarizeReviewQueue([item]));
  }
});

test('read-only monitor integrates public draft candidates and preserves fail-closed result', async () => {
  const p = { ...property('NEW-PUBLIC-1'), propertyType: 'APARTMENT', community: 'Dubai Marina',
    bedrooms: 2, sizeSqFt: 1200 };
  const messages = [];
  const errors = [];
  const exitCode = await run({
    fetchJson: async () => feed([p]),
    now,
    out: text => messages.push(text),
    error: text => errors.push(text),
  });
  assert.equal(exitCode, 2);
  assert.deepEqual(errors, []);
  assert.equal(messages.length, 1);
  const result = JSON.parse(messages[0]);
  assert.equal(result.result, 'REVIEW_REQUIRED');
  assert.equal(result.MISSING, 1);
  assert.equal(result.reviewQueue.count, 1);
  assert.deepEqual(result.reviewQueue.items, [{ reference: 'NEW-PUBLIC-1', reason: 'NO_RECORD', status: 'DRAFT' }]);
  assert.doesNotMatch(messages[0], /englishFingerprint|W celu potwierdzenia|EN details/);
});
