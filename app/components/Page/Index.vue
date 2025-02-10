<script lang="ts" setup>
  const {
    title,
    description,
    spacing = "space-y-10",
    admin = false
  } = defineProps<{
    title?: string
    description?: string
    contain?: boolean
    admin?: boolean
    spacing?: string
  }>()

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    twitterTitle: title,
    ogDescription: description,
    twitterDescription: description
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

    <!-- Acutal Page Content -->
    <main
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
