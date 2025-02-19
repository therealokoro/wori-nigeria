import { Articles } from "~~/server/database/models"

export default defineEventHandler(async () => {
  const db = useDb()
  const orderBy = [desc(Articles.createdAt)]
  const data = await db.query.Articles.findMany({ orderBy })

  const articles = data.map(c => ({
    ...c,
    link: `/articles/${c.slug}`,
    coverImage: `/cdn/images/${c.coverImage}`
  }))

  const [first, second, ...rest] = articles

  const more = rest.filter((c) => {
    return (c.id !== first.id || c.id !== second.id)
  })

  return { first, second, more }
})
