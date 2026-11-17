#!/usr/bin/env node
// PL-SYNC-03A: read-only diagnostic. No writes, translation, approval or publication.
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { isIP } from 'node:net';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const FEED_URL = 'https://www.pamaestates.com/feeds/properties.json';
const HOST = 'www.pamaestates.com';
const STATUS_NAMES = ['CURRENT', 'MISSING', 'STALE', 'CONFLICT'];
export const DEFAULT_MAX_FEED_AGE_HOURS = 168; // A week; stale feeds cannot pass.

export function evaluateSnapshot(feed, editorial, compare, fingerprint, now = new Date(), maxAgeHours = DEFAULT_MAX_FEED_AGE_HOURS) {
  if (!feed || feed.schemaVersion !== 1 || !Array.isArray(feed.properties) || feed.properties.length === 0) {
    throw new Error('Invalid or empty public feed');
  }
  const stamp = Date.parse(feed.generatedAt);
  const current = now.getTime();
  if (!Number.isFinite(stamp) || stamp <= 0 || stamp > current + 5 * 60_000) {
    throw new Error('Invalid/future public feed generatedAt');
  }
  if (!editorial || editorial.version !== 1 || !Array.isArray(editorial.records)) {
    throw new Error('Invalid editorial store');
  }
  for (const p of feed.properties) {
    if (!p || typeof p.listingReference !== 'string' || typeof p.title !== 'string' ||
      typeof p.description !== 'string' || !Array.isArray(p.amenities) || !Array.isArray(p.highlights)) {
      throw new Error('Malformed public property');
    }
  }
  const report = compare(feed.properties, editorial.records, fingerprint);
  if (!Array.isArray(report) || report.length !== feed.properties.length ||
    report.some(x => !STATUS_NAMES.includes(x?.status))) {
    throw new Error('Invalid comparison report');
  }
  const counts = Object.fromEntries(STATUS_NAMES.map(s => [s, report.filter(x => x.status === s).length]));
  const ageHours = Math.max(0, (current - stamp) / 3_600_000);
  const fresh = ageHours <= maxAgeHours;
  // Never report a healthy sync from a stale public source, even when fingerprints match.
  return {
    generatedAt: feed.generatedAt,
    propertyCount: feed.properties.length,
    editorialRecordCount: editorial.records.length,
    classifiedCount: report.length,
    ...counts,
    sourceFresh: fresh,
    result: fresh && counts.MISSING === 0 && counts.STALE === 0 && counts.CONFLICT === 0 ? 'PASS' : 'REVIEW_REQUIRED',
  };
}

export function curlArguments(ip) {
  const args = ['--silent', '--show-error', '--fail', '--max-time', '30', '--max-filesize', '15728640',
    '--proto', '=https', '--header', 'Accept: application/json'];
  if (ip) {
    if (isIP(ip) !== 4) throw new Error('PAMA_FEED_RESOLVE_IP must be a valid IPv4 address');
    args.push('--resolve', `${HOST}:443:${ip}`);
  }
  // No redirects to arbitrary hosts; TLS verification remains enabled.
  return [...args, FEED_URL];
}

export async function run({ fetchJson, now = new Date(), out = console.log, error = console.error } = {}) {
  try {
    const [{ buildPolishPropertySyncReport }, { sourceFingerprint }] = await Promise.all([
      import(pathToFileURL(resolve(root, 'src/lib/pl-property-sync.ts')).href),
      import(pathToFileURL(resolve(root, 'src/lib/pl-property.ts')).href),
    ]);
    const editorial = JSON.parse(readFileSync(resolve(root, 'src/content/pl-approved-properties.json'), 'utf8'));
    const feed = fetchJson ? await fetchJson() : JSON.parse(execFileSync(process.platform === 'win32' ? 'curl.exe' : 'curl', curlArguments(process.env.PAMA_FEED_RESOLVE_IP), {
      encoding: 'utf8', timeout: 35_000, maxBuffer: 16 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'pipe'],
    }));
    const summary = evaluateSnapshot(feed, editorial, buildPolishPropertySyncReport, sourceFingerprint, now);
    out(JSON.stringify(summary, null, 2));
    return summary.result === 'PASS' ? 0 : 2;
  } catch (e) {
    // Keep error output generic: do not echo external response payloads or credentials.
    error(`STOP: PL feed comparison unavailable (${e instanceof SyntaxError ? 'invalid JSON' : 'read/validation failure'}).`);
    return 1;
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.exitCode = await run();
}
