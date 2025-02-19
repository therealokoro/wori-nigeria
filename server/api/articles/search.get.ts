import { ilike } from "drizzle-orm"
import { Articles } from "~~/server/database/models"

export default defineEventHandler(async (e) => {
  const { limit = 20, title = "" } = getRouterParams(e)
  const db = useDb()

  const data = await db.query.Articles.findMany({
    where: ilike(Articles.title, `%${title}%`),
    limit: +limit,
    orderBy: [desc(Articles.createdAt)]
  })

  return { data }
})
