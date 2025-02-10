<script lang="ts" setup>
  import type { Article } from "@@/shared/types"

  defineProps<{ articles: Article[] }>()
</script>

<template>
  <div
    w="full"
    grid="~ cols-1 md:cols-2 lg:cols-3 gap-6"
  >
    <ArticlesCard
      v-for="article in articles"
      class=" w-full max-h-250px"
      :article
    />
  </div>
</template>
