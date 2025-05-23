import { consola } from "consola"
import { betterAuth } from "better-auth"
import { D1Dialect } from "@atinux/kysely-d1"

let _auth: ReturnType<typeof betterAuth>

export function serverAuth() {
  if (!_auth) {
    _auth = betterAuth({
      database: {
        // @ts-expect-error expect error under database
        dialect: new D1Dialect({ database: hubDatabase() }),
        type: "sqlite"
      },
      secondaryStorage: {
        get: key => hubKV().getItemRaw(`_auth:${key}`),
        set: (key, value, ttl) => {
          return hubKV().set(`_auth:${key}`, value, { ttl })
        },
        delete: key => hubKV().del(`_auth:${key}`)
      },
      baseURL: getBaseURL(),
      secret: process.env.BETTER_AUTH_SECRET,
      emailAndPassword: { enabled: true },
      trustedOrigins: ["https://womenrightsinitiative.org", "https://wori.nuxt.dev"]
    })
  }
  return _auth
}

function getBaseURL() {
  let baseURL = process.env.BETTER_AUTH_URL
  if (!baseURL) {
    try {
      baseURL = getRequestURL(useEvent()).origin
    }
    catch (e: any) { consola.log(e) }
  }
  return baseURL
}
