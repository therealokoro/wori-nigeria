<script setup lang="ts">
import { ConfigProvider } from "radix-vue"

const useIdFunction = () => useId()!

useHead({
  htmlAttrs: { lang: "en" },
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
})
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator color="#1B1F28" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- Notification -->
    <ClientOnly>
      <UiNotivue />
    </ClientOnly>
  </ConfigProvider>
</template>
