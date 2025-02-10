// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs"

export default withNuxt(
  {
    files: ["**/*.vue"],
    rules: {
      "vue/require-v-for-key": ["off"],
      "vue/valid-v-for": ["off"],
      "@stylistic/indent": ["off"],
      "vue/singleline-html-element-content-newline": ["off"]
    }
  },
  {
    rules: {
      "@stylistic/comma-dangle": ["error", "never"],
      "@typescript-eslint/no-explicit-any": ["off"]
    }
  }
)
