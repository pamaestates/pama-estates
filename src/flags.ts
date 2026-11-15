import { flag } from "flags/next"
import { vercelAdapter } from "@flags-sdk/vercel"

export const pamaWebsiteEnEnabled = flag<boolean>({
  key: "pama-website-en-enabled",
  adapter: vercelAdapter(),
})

export const pamaWebsitePlEnabled = flag<boolean>({
  key: "pama-website-pl-enabled",
  adapter: vercelAdapter(),
})