import { Articles } from "~~/server/database/models"

export default defineEventHandler(async (e) => {
  const id = getRouterParam(e, "id")
  if (!id) throw createError("Please provide all required fields")

  const db = useDb()
  const data = await db
    .delete(Articles)
    .where(eq(Articles.id, id))
    .returning()
    .get()

  await hubBlob().delete(data.coverImage)
  return { data }
})
