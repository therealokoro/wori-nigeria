<script lang="ts" setup>
// get id from route params and fetch article
const id = useRoute().params.id?.toString()
const { data, error } = await useAsyncData(`article-${id}`, () => useGetSingleArticle({ id }))
const article = computed(() => data.value?.article)
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
  </Page>
</template>
