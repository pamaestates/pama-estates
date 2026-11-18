import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateSnapshot, DEFAULT_MAX_FEED_AGE_HOURS } from '../scripts/check-pl-property-sync.mjs';

const t0 = new Date('2026-11-18T12:00:00.000Z');
const feed = (generatedAt) => ({
  schemaVersion: 1,
  generatedAt,
  properties: [{ listingReference: 'PAMA-TEST-001', title: 'English title', description: 'English description', amenities: [], highlights: [] }],
});
const editorial = { version: 1, records: [{ reference: 'PAMA-TEST-001' }] };
const compare = (status) => () => [{ reference: 'PAMA-TEST-001', status }];
const fingerprint = () => 'fixture';

test('fresh source and current translations pass both gates', () => {
  const result = evaluateSnapshot(feed('2026-11-18T11:00:00.000Z'), editorial, compare('CURRENT'), fingerprint, t0);
  assert.equal(result.translationSync, 'CURRENT');
  assert.equal(result.sourceFreshness, 'FRESH');
  assert.equal(result.sourceFresh, true);
  assert.equal(result.result, 'PASS');
});

test('old source and matching translations remain review required, but reasons are separate', () => {
  const result = evaluateSnapshot(feed('2026-10-22T17:53:18.516Z'), editorial, compare('CURRENT'), fingerprint, t0);
  assert.equal(result.translationSync, 'CURRENT');
  assert.equal(result.sourceFreshness, 'STALE');
  assert.equal(result.sourceFresh, false);
  assert.equal(result.result, 'REVIEW_REQUIRED');
});

test('fresh source and changed English copy require translation review', () => {
  const result = evaluateSnapshot(feed('2026-11-18T11:00:00.000Z'), editorial, compare('STALE'), fingerprint, t0);
  assert.equal(result.translationSync, 'REVIEW_REQUIRED');
  assert.equal(result.sourceFreshness, 'FRESH');
  assert.equal(result.result, 'REVIEW_REQUIRED');
});

test('missing translation stays blocked even when feed is fresh', () => {
  const result = evaluateSnapshot(feed('2026-11-18T11:00:00.000Z'), editorial, compare('MISSING'), fingerprint, t0);
  assert.equal(result.translationSync, 'REVIEW_REQUIRED');
  assert.equal(result.result, 'REVIEW_REQUIRED');
});

test('source precisely at the existing freshness limit passes; older source does not', () => {
  const boundary = new Date(t0.getTime() - DEFAULT_MAX_FEED_AGE_HOURS * 3600000);
  const atLimit = evaluateSnapshot(feed(boundary.toISOString()), editorial, compare('CURRENT'), fingerprint, t0);
  assert.equal(atLimit.sourceFreshness, 'FRESH');
  assert.equal(atLimit.result, 'PASS');
  const justOlder = evaluateSnapshot(feed(new Date(boundary.getTime() - 1).toISOString()), editorial, compare('CURRENT'), fingerprint, t0);
  assert.equal(justOlder.sourceFreshness, 'STALE');
  assert.equal(justOlder.result, 'REVIEW_REQUIRED');
});

test('invalid or future source date still fails closed', () => {
  assert.throws(() => evaluateSnapshot(feed('invalid'), editorial, compare('CURRENT'), fingerprint, t0));
  assert.throws(() => evaluateSnapshot(feed('2026-11-18T12:06:00.000Z'), editorial, compare('CURRENT'), fingerprint, t0));
});
