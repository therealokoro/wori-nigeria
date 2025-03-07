import { Albums } from "~~/server/database/models"
import { fetchAlbum } from "~~/server/services/albums"

export default defineEventHandler(async (e) => {
  const query = getQuery(e)
  const fileUrl = query.fileUrl?.toString()
  const id = query.id?.toString()

  if (!fileUrl || id) throw createError({ message: "Please select an image to delete" })
  try {
    const album = await fetchAlbum({ id })
    if (!album) throw createError({ message: "Could not delete the image" })

    await hubBlob().delete(fileUrl)
    const imgList = album.images.filter(c => c !== fileUrl)
    await useDb()
      .update(Albums)
      .set({ images: [...imgList] })
      .where(eq(Albums.id, id))
    return "Image was deleted successfully"
  }
  catch (e: any) {
    throw createError(e)
  }
})
