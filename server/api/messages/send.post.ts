import * as v from "valibot"
import { capitalize } from "string-ts"
import { CreateMessageSchema } from "~~/shared/schemas"
import { Messages } from "~~/server/database/models"

export default defineEventHandler(async (e) => {
  const body = v.parse(CreateMessageSchema, await readBody(e))

  // insert the message
  const data = await useDb()
    .insert(Messages)
    .values({
      ...body,
      firstname: capitalize(body.firstname),
      lastname: capitalize(body.lastname)
    })
    .returning()
    .get()

  return { data }
})
