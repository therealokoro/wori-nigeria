const images = []

export default defineEventHandler(async (e) => {
  const query = getQuery<{ limit?: number }>(e)
  return Number(query.limit) ? images.slice(0, 5) : images
})
