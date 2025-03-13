export default defineEventHandler(async () => {
  const images = await useDb().query.Albums.findMany()
  return images
})
