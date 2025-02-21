const prerenderRoutes = ["/about-us", "/contact-us", "/services", "/gallery"]
export default defineNuxtConfig({
  modules: [
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/fonts",
    "@unocss/nuxt",
    "@vueuse/nuxt",
    "notivue/nuxt",
    "nuxt-marquee",
    "@nuxt/eslint",
    "@nuxthub/core",
    "@nuxt/devtools",
    "@vee-validate/nuxt",
    "@morev/vue-transitions/nuxt"
  ],

  imports: {
    dirs: ["./constants"],
    imports: [
      { from: "tailwind-variants", name: "tv" },
      { from: "tailwind-variants", name: "VariantProps", type: true },
      { from: "notivue", name: "push", as: "$toast" }
    ]
  },

  devtools: { enabled: true },

  app: {
    head: {
      charset: "utf-8",
      htmlAttrs: { lang: "en" },
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
      link: [{ rel: "icon", type: "image/svg+xml", href: "/wori-icon.svg" }]
    }
  },

  css: [
    "@unocss/reset/tailwind-compat.css",
    "notivue/animations.css",
    "~/assets/css/main.css"
  ],

  routeRules: {
    "/articles": { isr: 3600 },
    "/admin/**": { ssr: false }
  },

  future: { compatibilityVersion: 4 },
  compatibilityDate: "2024-11-01",

  nitro: {
    experimental: { openAPI: true },
    prerender: {
      crawlLinks: true,
      routes: prerenderRoutes
    },
    cloudflare: {
      pages: {
        routes: { exclude: prerenderRoutes }
      }
    }
  },

  hub: {
    database: true,
    cache: true,
    blob: true
  },

  eslint: {
    config: {
      stylistic: {
        quotes: "double"
      }
    }
  },

  image: {
    format: ["webp"],
    providers: {
      myProvider: {
        name: "local",
        provider: "./app/lib/provides/image.ts"
      }
    }
  }
})
