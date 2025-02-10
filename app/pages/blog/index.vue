<script lang="ts" setup>
const article = {
  title: "WORI Meets with the less privilaged",
  coverImage: "/news-4.jpg",
  description: "A meeting was held by the executives of WORI with the less privilaged to foster stronger relationships and ties",
  createdAt: "24th April 2025",
  link: "/blog/r5wdqwdwq-321221"
}
</script>

<template>
  <Page
    title="Blog"
    bg="background"
  >
    <PageSection title-left="Latest News">
      <div
        w="full"
        grid="~ cols-1 lg:cols-5 gap-6"
      >
        <!-- Main -->
        <div class="col-span-1 lg:col-span-3">
          <ArticlesCard
            :article
            main
          />
        </div>

        <!-- Aside -->
        <aside class="lg:col-span-2 space-y-7">
          <ArticlesCard
            v-for="i in 2"
            :di="i"
            :article
          />
        </aside>
      </div>
    </PageSection>

    <PageSection title-left="More News">
      <div grid="~ col-span-1 lg:col-span-3 cols-1 lg:cols-2 gap-6">
        <ArticlesCard
          v-for="i in 3"
          :di="i"
          :article
        />
      </div>
    </PageSection>
  </Page>
</template>
