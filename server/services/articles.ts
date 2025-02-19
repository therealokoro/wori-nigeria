import { asc } from "drizzle-orm"
import { Articles } from "~~/server/database/models"

type Query = {
  slug?: string
  id?: string
}

export async function fetchArticle({ slug, id }: Query) {
  return await useDb().query.Articles.findFirst({
    where: slug ? eq(Articles.slug, slug) : id ? eq(Articles.id, id) : undefined
  })
}

export async function fetchNextArticles(cursor?: number, pageSize = 3) {
  return await useDb()
    .select()
    .from(Articles)
    .limit(pageSize) // the number of rows to return
    .orderBy(asc(Articles.id)) // ordering
}

export async function uploadArticleImage(image: File) {
  // validate and upload the cover image to server in the image folder
  ensureBlob(image, { maxSize: "1MB", types: ["image"] })
  return await hubBlob().put(image.name, image, { prefix: "images" })
}
