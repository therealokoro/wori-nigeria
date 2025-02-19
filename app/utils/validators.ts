export const checkPageResource = (resource: any) => {
  if (resource) return true
  else throw createError({
    statusCode: 404,
    statusMessage: "Not found",
    message: "The article you're looking for was not found"
  })
}
