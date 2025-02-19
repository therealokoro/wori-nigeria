import { fetchArticle, fetchNextArticles } from "~~/server/services/articles"

export default defineEventHandler(async (e) => {
  const query = getQuery<{ slug?: string, id?: string, showNext?: boolean }>(e)
  if (!query) throw createError("Please provide all required fields")
  const data = await fetchArticle(query)

  if (!data) throw createError({
    statusCode: 404,
    statusMessage: "Not found",
    message: "The article you're looking for was not found"
  })

  const _next = query.showNext ? await fetchNextArticles() : null
  const nextArticles = _next?.map(c => ({
    ...c,
    link: `/articles/${c.slug}`,
    coverImage: `/cdn/images/${c.coverImage}`
  }))

  return {
    article: { ...data, coverImage: `/cdn/images/${data.coverImage}` },
    nextArticles
  }
})
