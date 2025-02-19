<script lang="ts" setup>
import "~/assets/css/wysiwyg.css"

const slug = useRoute().params.slug?.toString()
const { data } = await useFetch("/api/articles/single", {
  query: { slug, showNext: true }
})

const article = computed(() => data.value!.article)
const title = computed(() => article.value.title)
const createdAt = computed(() => formatDate(article.value.createdAt))
const nextArticles = computed(() => data.value!.nextArticles)
</script>

<template>
  <Page title="Blog">
    <PageSection
      :title-left="title"
      :description="article.description"
      :meta="createdAt"
    >
      <div
        w="full"
        grid="~ cols-1 lg:cols-3 gap-7"
      >
        <!-- Main -->
        <article class="col-span-1 lg:col-span-2">
          <div class="h-60 sm:h-80 md:h-100 mb-10">
            <NuxtImg
              :src="article.coverImage"
              image="cover"
            />
          </div>

          <div
            class="wysiwyg"
            v-html="article.content"
          />
        </article>

        <!-- Aside -->
        <aside class="col-span-1 space-y-7">
          <ui-text
            type="subtitle"
            mb="5"
          >
            More Articles
          </ui-text>
          <ArticlesCard
            v-for="i in nextArticles"
            class="h-200px"
            :article="i"
          />
        </aside>
      </div>
    </PageSection>
  </Page>
</template>
