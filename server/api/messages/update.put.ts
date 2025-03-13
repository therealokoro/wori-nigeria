import * as v from "valibot"
import { Messages } from "~~/server/database/models"
import { UpdateMessageSchema } from "~~/shared/schemas"

export default defineEventHandler(async (e) => {
  const body = v.parse(UpdateMessageSchema, await readBody(e))

  // ifis reply, send mail

  // update the message
  const data = await useDb()
    .update(Messages)
    .set({ ...body })
    .where(eq(Messages.id, body.id))
    .returning()
    .get()

  return { data }
})
