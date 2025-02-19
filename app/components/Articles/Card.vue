<script lang="ts" setup>
import type { IArticleWithLink } from "~~/shared/types"

const props = defineProps<{ article: IArticleWithLink, showButton?: boolean }>()
const el = computed(() => props.showButton ? "div" : resolveComponent("NuxtLink"))
</script>

<template>
  <component
    :is="el"
    :to="article.link"
    class="block group relative overflow-hidden"
  >
    <nuxt-img
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
            {{ formatDate(article.createdAt) }}
          </ui-text>
          <ui-button
            v-if="showButton"
            text="Learn More"
            :to="article.link"
          />
        </div>
      </div>
    </div>
  </component>
</template>
