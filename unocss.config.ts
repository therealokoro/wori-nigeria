import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  presetTypography,
  transformerDirectives,
  transformerVariantGroup
} from "unocss"
import presetAnimations from "unocss-preset-animations"
import { presetShadcn } from "unocss-preset-shadcn"

export default defineConfig({
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetAnimations(),
    presetShadcn({ color: false, radius: false }, false)
  ],
  shortcuts: {
    "highlight-ring":
      "!outline-none ring-1 ring-ring/40 ring-offset-2 rounded-$radius",
    "highlight": "highlight-ring bg-primary/5 rounded-$radius",
    "flex-center": "flex justify-center items-center",
    "flex-horizontal": "flex justify-between items-center",
    "flex-vertical": "flex flex-col justify-between",
    "f-container": "container mx-auto px-1rem md:px-2rem",
    "image-cover": "object-cover size-full",
    "image-overlay": "bg-gradient-(to-b from-gray-500/50 from-0 to-100 to-zinc-950)"
  },
  theme: {
    fontFamily: {
      sans: "Inter, sans-serif"
    },
    spacing: {
      4: "1rem"
    },
    fontSize: {
      "tiny": "0.6875rem", // 11px
      "sm": "0.8125rem", // 13px
      "md": "1rem", // 16px
      "lg": "1.25rem", // 20px
      "xl": "1.5rem", // 24px
      "2xl": "1.875rem", // 30px
      "3xl": "2.25rem", // 36px
      "4xl": "2.75rem", // 44px
      "5xl": "3.5rem", // 56px
      "6xl": "5rem" // 80px
    }
  },
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // shadcn js/ts files
        "**/(components|src)/**/*.{js,ts}",
        "**/utils/shared.styles.ts"
      ]
    }
  }
})
