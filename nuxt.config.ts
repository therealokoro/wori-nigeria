// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/fonts",
    // "@pinia/nuxt",
    "@unocss/nuxt",
    "@vueuse/nuxt",
    "notivue/nuxt",
    "nuxt-marquee",
    "@nuxt/eslint",
    "@nuxthub/core",
    "@nuxt/devtools",
    // "@pinia/colada-nuxt",
    "@vee-validate/nuxt",
    "@hebilicious/vue-query-nuxt",
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

  future: { compatibilityVersion: 4 },
  compatibilityDate: "2024-11-01",

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
