import type { InferSelectModel } from "drizzle-orm"
import type { Albums, Articles, Messages } from "../server/database/models"

export type IArticle = InferSelectModel<typeof Articles>
export type IMessage = InferSelectModel<typeof Messages>

export type IArticleWithLink = IArticle & {
  link: string
}

export type IAlbum = InferSelectModel<typeof Albums>
