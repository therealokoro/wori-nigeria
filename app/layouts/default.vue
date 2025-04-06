<script lang="ts" setup>
const { url, ogImageLink, description } = useAppConfig().info

useSeoMeta({
  description,
  ogDescription: description,
  ogImage: ogImageLink,
  ogUrl: url,
  twitterDescription: description,
  twitterImage: ogImageLink,
  twitterCard: "summary_large_image"
})

useHead({
  htmlAttrs: { lang: "en" },
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
})
</script>

<template>
  <div
    class="relative min-h-screen flex flex-col"
    overflow-x="hidden"
  >
    <PageHeader />

    <div class="w-full">
      <slot />
    </div>

    <PageFooter />
  </div>
</template>
