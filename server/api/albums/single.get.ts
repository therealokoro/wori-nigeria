import { fetchAlbum } from "~~/server/services/albums"

export default defineEventHandler(async (e) => {
  const query = getQuery<{ slug?: string, id?: string }>(e)
  if (!query) throw createError("Please provide all required fields")
  const data = await fetchAlbum(query)

  if (!data) throw createError({
    statusCode: 404,
    statusMessage: "Not found",
    message: "The album you're looking for was not found"
  })

  return data
})
