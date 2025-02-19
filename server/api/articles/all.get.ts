import { count } from "drizzle-orm"
import { Articles } from "~~/server/database/models"

export default defineEventHandler(async (e) => {
  const query = getQuery(e)
  const db = useDb()

  const limit = query.limit ? +query.limit : 50
  const page = query.page ? +query.page : 1
  const offset = (page - 1) * limit
  const orderBy = [desc(Articles.createdAt)]
  const data = await db.query.Articles.findMany({ limit, orderBy, offset })
  const total = await db.select({ count: count() }).from(Articles)

  const articles = data.map(c => ({
    ...c,
    coverImage: `/cdn/images/${c.coverImage}`
  }))

  return {
    count: total[0].count,
    articles
  }
})
