import { parse } from "valibot"
import { capitalize, kebabCase } from "string-ts"
import { UpdateAlbumSchema } from "~~/shared/schemas"
import { formDataToObject } from "~/utils/format"
import { fetchAlbum, uploadAlbumImages } from "~~/server/services/albums"
import { Albums } from "~~/server/database/models"

export default defineEventHandler(async (e) => {
  const raw = formDataToObject(await readFormData(e))
  const body = parse(UpdateAlbumSchema, raw)
  let newImages: string[] = []

  // check for existing album
  const album = await fetchAlbum({ id: body.id })
  // throw error if album doesn't exists
  if (!album) {
    throw createError({ message: "The album you're looking for doesn't exist" })
  }

  // Upload any avaliable new image
  if (body.images) {
    newImages = await uploadAlbumImages(body.images)
  }

  const images = [...newImages, ...(album ? album.images : [])]
  if (images.length < 1) {
    throw createError({ message: "Album must contain atleast one image" })
  }

  // create album and insert image urls
  const data = await useDb()
    .update(Albums)
    .set({
      slug: kebabCase(body.title),
      title: capitalize(body.title),
      images
    })
    .where(eq(Albums.id, body.id))
    .returning()
    .get()

  return { data }
})
