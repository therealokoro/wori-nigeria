<script lang="ts" setup>
import type { Article } from "~~/shared/types"

const props = defineProps<{ article: Article, main?: boolean }>()
const el = computed(() => props.main ? resolveComponent("NuxtLink") : "div")
</script>

<template>
  <component
    :is="el"
    :to="article.link"
    class="block group relative overflow-hidden"
  >
    <NuxtImg
      :src="article.coverImage"
      image="cover"
      transition="~ ease-in-out"
      group-hover="scale-107"
    />

    <div class="absolute inset-0 text-white flex">
      <div
        p="5"
        flex="1 ~ col gap-3 justify-end"
        image="overlay"
      >
        <ui-text
          type="subtitle"
          :class="{ 'group-hover:underline': el == 'NuxtLink' }"
        >
          {{ article.title }}
        </ui-text>
        <ui-text
          type="small"
          line-clamp="1 md:2"
          class="text-gray-300"
        >
          {{ article.description }}
        </ui-text>
        <div flex="horizontal">
          <ui-text
            type="caption"
            class="text-gray-300"
          >
            {{ article.createdAt }}
          </ui-text>
          <ui-button
            v-if="!main"
            text="Learn More"
            to="/blog/45678ibjh"
          />
        </div>
      </div>
    </div>
  </component>
</template>
