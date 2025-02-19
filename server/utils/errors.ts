import { consola } from "consola"

export const formatErrors = (error: any) => {
  const code: string = error?.code
  // Unique constraint:
  if (code === "23505") {
    const detail: string = error?.detail
    const matches = detail.match(/\((.*?)\)/g)
    if (matches) {
      const [key, value] = matches.map((match) => match.replace(/\(|\)/g, ""))
      throw createError({
        statusMessage: `An entry with the value '${value}' already exists for the field '${key}'.`
      })
    }
  }
  // Not-Null constraint
  else if (code === "23502") {
    const table: string = error?.table
    const column: string = error?.column
    throw createError({
      statusMessage: `The column '${column}' in table '${table}' cannot be null.`
    })
  } else {
    consola.error(error.message)
    throw createError(error)
  }
}
