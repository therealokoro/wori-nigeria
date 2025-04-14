<script lang="ts" setup>
// get id from route params and fetch article
const id = useRoute().params.id?.toString()
const { data, error } = await useAsyncData(`article-${id}`, () => useGetSingleArticle({ id }))
const article = computed(() => data.value?.article)

async function handleDeleteArticle() {
  const toast = $toast.promise("Delete article, please wait....")
  try {
    await $fetch(`/api/articles/${id}`, { method: "DELETE" })
    toast.success("Article was deleted successfully")
    await navigateTo("/admin/articles")
  }
  catch (error: any) {
    toast.error(error.data.message)
  }
}
</script>

<template>
  <Page
    admin
    :error
    title="Edit Article"
  >
    <ArticlesCreateEdit
      action="edit"
      :article
    />

    <div class="w-full">
      <UiConfirmDialog
        message="Are you sure you want to delete this article?"
        @confirm="handleDeleteArticle"
      >
        <UiButton
          type="button"
          variant="destructive"
          text="Delete Article"
        />
      </UiConfirmDialog>
    </div>
  </Page>
</template>
