import type { BlobObject } from "@nuxthub/core"
import { kebabCase, capitalize } from "string-ts"
import { Articles } from "~~/server/database/models"

export default defineEventHandler(async (e) => {
  const fd = await readFormData(e)
  const title = fd.get("title")?.toString()
  const id = getQuery<{ id: string }>(e).id
  const image = fd.get("coverImage") as File
  const content = fd.get("content")?.toString()
  const description = fd.get("description")?.toString()

  if (!id || !title || !content) {
    throw createError("Please provide all required fields")
  }

  // validate and upload the cover image to server if provided by user in client
  let cover: BlobObject | null = null
  if (image && image instanceof File) {
    cover = await uploadImage(image, id, "articles")
  }

  // insert the article
  const data = await useDb()
    .update(Articles)
    .set({
      ...(cover && { coverImage: cover.pathname }),
      title: capitalize(title),
      slug: kebabCase(title),
      description,
      content
    })
    .where(eq(Articles.id, id))
    .returning()
    .get()

  return { data }
})
