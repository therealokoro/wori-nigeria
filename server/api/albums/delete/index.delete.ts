import { Albums } from "~~/server/database/models"
import { fetchAlbum } from "~~/server/services/albums"

export default defineEventHandler(async (e) => {
  const query = getQuery(e)
  const id = query.id?.toString()

  if (!id) throw createError({ message: "Please select an image to delete" })
  try {
    const album = await fetchAlbum({ id })
    if (!album) throw createError({ message: "The album you are looking for does not exist" })

    await hubBlob().delete(album.images)
    await useDb().delete(Albums).where(eq(Albums.id, id))
    return "Album was deleted successfully"
  }
  catch (e: any) {
    throw createError(e)
  }
})
