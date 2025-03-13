import { Messages } from "~~/server/database/models"

export default defineEventHandler(async (e) => {
  const id = getQuery(e).id?.toString()

  if (!id) throw createError({ message: "Please select a message to delete" })

  // insert the article
  const data = await useDb()
    .delete(Messages)
    .where(eq(Messages.id, id))
    .returning()
    .get()

  return { data }
})
