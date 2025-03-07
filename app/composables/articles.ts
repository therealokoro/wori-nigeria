export type ArticleSubmitActions = "edit" | "create"

const msgMap: Record<ArticleSubmitActions, string[]> = {
  create: ["Creating", "created"],
  edit: ["Editing", "editing"]
}

export const useSubmitArticle = async (values: any, mode: ArticleSubmitActions, id?: string) => {
  const action = mode.toLowerCase() as ArticleSubmitActions

  // check if editor is empty
  if (values.editor == "") return $toast.error("Content cannot be left empty")

  const toast = $toast.promise(
    `${msgMap[mode][0]} your article, please wait...`
  )

  try {
    // convert values to formData and send to backend
    const body = objectToFormData(values)
    await $fetch(`/api/articles/${action}?id=${id}`, { body, method: "POST" })
    toast.success(`Your article was ${msgMap[action][1]} successfully`)
    return navigateTo("/admin/articles")
  }
  catch (e: any) {
    toast.error(e.data.message)
  }
}
export const useFetchArticles = async (limit: number, page: number) => {
  return await $fetch("/api/articles/all", { query: { limit, page } })
}

export const useGetSingleArticle = async (query: { [x: string]: any }) => {
  return await $fetch("/api/articles/single", { query })
}
