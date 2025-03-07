import { sql } from "drizzle-orm"
import { typeid } from "typeid-js"
import { sqliteTable, text } from "drizzle-orm/sqlite-core"

export const Articles = sqliteTable("articles", {
  id: text("id", { length: 36 })
    .primaryKey()
    .notNull()
    .$defaultFn(() => typeid().toString()),
  title: text("title", { length: 500 }).notNull().unique(),
  description: text("description", { length: 500 }),
  slug: text("slug", { length: 500 }).notNull().unique(),
  content: text("content").notNull(),
  coverImage: text("cover_image", { length: 500 }).notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`)
})

export const Albums = sqliteTable("album", {
  id: text("id", { length: 36 })
    .primaryKey()
    .notNull()
    .$defaultFn(() => typeid().toString()),
  title: text("title", { length: 500 }).notNull().unique(),
  slug: text("slug", { length: 500 }).notNull().unique(),
  images: text({ mode: "json" }).$type<string[]>().notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`)
})
