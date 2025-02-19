<script setup lang="ts">
import { ConfigProvider } from "radix-vue"

const useIdFunction = () => useId()!
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator color="#1B1F28" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ConfigProvider>
</template>
