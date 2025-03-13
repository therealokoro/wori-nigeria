<script lang="ts" setup>
const admin = false
const itemsPerPage = 3
const currPage = ref(Number(useRoute().query?.page) || 1)

const { data } = await useAsyncData(
  `articles-${itemsPerPage}`,
  () => useFetchArticles(itemsPerPage, currPage.value),
  { watch: [currPage], default: () => ({ articles: [], count: 0 }) }
)

const renderList = computed(() => {
  return data.value.articles.map(curr => ({
    ...curr,
    link: admin ? `/admin/articles/${curr.id}` : `/articles/${curr.slug}`
  }))
})
</script>

<template>
  <PageSection
    v-if="renderList.length"
    title="Latest Article"
  >
    <div
      w="full"
      grid="~ cols-1 md:cols-2 lg:cols-3 gap-6"
    >
      <ArticlesCard
        v-for="article in renderList"
        class="w-full h-250px"
        :article
      />
    </div>
  </PageSection>
</template>
