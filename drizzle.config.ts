import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dialect: "sqlite",
  driver: "d1-http",
  schema: "./server/database/models/index.ts",
  out: "./server/database/migrations"
})
