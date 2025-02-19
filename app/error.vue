<script setup lang="ts">
  import type { NuxtError } from "#app"

  const { error } = defineProps<{ error: NuxtError<{ message: string }> }>()
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout name="default">
    <UiContainer>
      <PageError :error />
    </UiContainer>
  </NuxtLayout>
</template>
