import { parse } from "valibot"
import { capitalize, kebabCase } from "string-ts"
import { CreateAlbumSchema } from "~~/shared/schemas"
import { formDataToObject } from "~/utils/format"
import { fetchAlbum, uploadAlbumImages } from "~~/server/services/albums"
import { Albums } from "~~/server/database/models"

export default defineEventHandler(async (e) => {
  const raw = formDataToObject(await readFormData(e))
  const body = parse(CreateAlbumSchema, raw)

  // check for existing album throw error if album exists
  const album = await fetchAlbum({ slug: kebabCase(body.title) })
  if (album) {
    throw createError({ message: "You already have an album with this title" })
  }

  // Upload all images
  const newImages = await uploadAlbumImages(body.images)

  // create album and insert image urls
  const data = await useDb()
    .insert(Albums)
    .values({
      slug: kebabCase(body.title),
      title: capitalize(body.title),
      images: [...newImages]
    })
    .returning()
    .get()

  return data
})
