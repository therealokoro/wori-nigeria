<script setup lang="ts">
import { ConfigProvider } from "radix-vue"

const useIdFunction = () => useId()!
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ConfigProvider>
</template>
