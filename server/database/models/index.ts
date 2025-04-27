import { sql } from "drizzle-orm"
import { typeid } from "typeid-js"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const Articles = sqliteTable("articles", {
  id: text("id", { length: 36 })
    .primaryKey()
    .notNull()
    .$defaultFn(() => typeid("article").toString()),
  title: text("title", { length: 500 }).notNull().unique(),
  description: text("description", { length: 500 }).notNull(),
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
    .$defaultFn(() => typeid("album").toString()),
  title: text("title", { length: 500 }).notNull().unique(),
  slug: text("slug", { length: 500 }).notNull().unique(),
  images: text({ mode: "json" }).$type<string[]>().notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`)
})

export const Messages = sqliteTable("messages", {
  id: text("id", { length: 36 })
    .primaryKey()
    .notNull()
    .$defaultFn(() => typeid("message").toString()),
  lastname: text("lastname", { length: 500 }).notNull().unique(),
  firstname: text("firstname", { length: 500 }).notNull().unique(),
  email: text("email", { length: 500 }).notNull().unique(),
  isRead: integer("is-read", { mode: "boolean" }),
  body: text("body").notNull().unique(),
  response: text("response"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`)
})
