<script lang="ts" setup>
  import type { NuxtError } from "#app"

  const {
    title,
    ogImageUrl,
    description: _desc,
    spacing = "space-y-10",
    admin = false
  } = defineProps<{
    title?: string
    description?: string
    ogImageUrl?: string
    contain?: boolean
    admin?: boolean
    spacing?: string
    error?: NuxtError<any>
  }>()

  const info = useAppConfig().info
  const description = _desc ? _desc : info.description
  const ogImageLink = ogImageUrl ? ogImageUrl : info.ogImageLink

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogUrl: info.url,
    twitterTitle: title,
    ogImage: ogImageLink,
    ogDescription: description,
    twitterImage: ogImageLink,
    twitterDescription: description,
    twitterCard: "summary_large_image",
    titleTemplate: s => s
      ? `${s} | Women Rights Initiative (WORI)`
      : "Women Rights Initiative (WORI) Official Website"
  })
</script>

<template>
  <div
    w="full"
    flex="~ col"
    class="relative"
    :class="{ 'pt-$header-height': !admin }"
  >
    <div v-if="$slots.hero">
      <slot name="hero" />
    </div>

    <!-- Render Error Page -->
    <PageError
      v-if="error"
      :error
    />

    <!-- Acutal Page Content -->
    <main
      v-else
      flex="1"
      :class="[
        contain ? 'f-container' : 'w-full',
        spacing,
      ]"
    >
      <slot />
    </main>
  </div>
</template>
