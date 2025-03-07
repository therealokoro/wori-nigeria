interface FlattenedItem {
  title: string
  src: string
}

export default defineEventHandler(async () => {
  const images = await useDb().query.Albums.findMany()
  const data = images.reduce((acc: FlattenedItem[], item) => {
    item.images.forEach((image) => {
      acc.push({
        title: item.title,
        src: "/cdn/images/" + image
      })
    })
    return acc
  }, [])
  return data
})
