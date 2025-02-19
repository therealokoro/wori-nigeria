<script lang="ts" setup>
const { data } = await useFetch("/api/articles/latest")
</script>

<template>
  <Page
    title="Blog"
    bg="background"
  >
    <div v-if="data?.first">
      <PageSection title-left="Latest News">
        <div
          w="full"
          grid="~ cols-1 lg:cols-5 gap-6"
        >
          <!-- Main -->
          <div class="col-span-1 lg:col-span-3">
            <ArticlesCard
              :article="data.first"
              class="h-400px"
              show-button
            />
          </div>

          <!-- Aside -->
          <aside
            v-if="data?.second"
            class="lg:col-span-2 space-y-7"
          >
            <ArticlesCard
              class="h-400px"
              :article="data.second"
            />
          </aside>
        </div>
      </PageSection>

      <!-- More News -->
      <PageSection
        v-if="data?.more"
        title-left="More News"
      >
        <div
          w="full"
          grid="~ cols-1 md:cols-2 lg:cols-3 gap-6"
        >
          <ArticlesCard
            v-for="article in data.more"
            class="w-full h-250px"
            :article
          />
        </div>
      </PageSection>
    </div>

    <ArticlesEmptyPlaceholder
      v-else
    />
  </Page>
</template>
