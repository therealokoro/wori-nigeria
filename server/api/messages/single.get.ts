import { Messages } from "~~/server/database/models"

export default defineEventHandler(async (e) => {
  const id = getQuery(e).id?.toString()

  if (!id) throw createError({ message: "Please select a message to view" })

  // fetch single message
  const data = await useDb().query.Messages.findFirst({ where: eq(Messages.id, id) })

  if (!data) throw createError({
    statusCode: 404,
    statusMessage: "Not found",
    message: "The message you're looking for was not found"
  })

  return data
})
