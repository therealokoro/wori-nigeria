import { count } from "drizzle-orm"
import { Messages } from "~~/server/database/models"

export default defineEventHandler(async (e) => {
  const query = getQuery(e)
  const db = useDb()

  const limit = query.limit ? +query.limit : 50
  const page = query.page ? +query.page : 1
  const offset = (page - 1) * limit
  const orderBy = [desc(Messages.createdAt)]
  const messages = await db.query.Messages.findMany({ limit, orderBy, offset })
  const total = await db.select({ count: count() }).from(Messages)

  return {
    count: total[0].count,
    messages
  }
})
