import { typeid } from "typeid-js"
import { kebabCase, capitalize } from "string-ts"
import { Articles } from "~~/server/database/models"
import { fetchArticle, uploadArticleImage } from "~~/server/services/articles"

export default defineEventHandler(async (e) => {
  const fd = await readFormData(e)
  const title = fd.get("title")?.toString()
  const image = fd.get("coverImage") as File
  const content = fd.get("content")?.toString()
  const description = fd.get("description")?.toString()

  if (!title || !content || !image) {
    throw createError("Please provide all required fields")
  }

  // check if an article exists with same title/slug
  const article = await fetchArticle({ slug: kebabCase(title) })
  if (article) {
    throw createError({
      statusMessage: "You already have an article with this title"
    })
  }

  // create ID for the article
  const articleId = typeid().toString()
  // validate and upload the cover image to server in the image folder
  const cover = await uploadArticleImage(image, articleId)

  // insert the article
  const data = await useDb()
    .insert(Articles)
    .values({
      content,
      description,
      id: articleId,
      slug: kebabCase(title),
      title: capitalize(title),
      coverImage: cover.pathname
    })
    .returning()
    .get()

  return { data }
})
