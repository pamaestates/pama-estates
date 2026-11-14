import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const source = readFileSync("src/proxy.ts", "utf8")

test("maintenance template retains valid style boundaries", () => {
  assert.match(source, /<style>[\s\S]*?<\/style>\s*<\/head>/)
  assert.equal((source.match(/<style>/g) ?? []).length, 1)
  assert.equal((source.match(/<\/style>/g) ?? []).length, 1)
})

test("maintenance provides direct WhatsApp and visible email", () => {
  assert.match(source, /https:\/\/wa\.me\/971559003888/)
  assert.match(source, /Contact us on WhatsApp/)
  assert.match(source, /<p class="contact-email">info@pamaestates\.com<\/p>/)
})