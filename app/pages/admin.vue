<script lang="ts" setup>
  definePageMeta({ layout: "empty" })

  useSeoMeta({
    titleTemplate: "%s | Admin Dashboard - ACHEI",
    description: "Administrative Dashboard"
  })

  const pageTitle = computed(() => useRoute().path.split("/")[2] || "Dashboard")
  const navItems = [
    { label: "Overview", to: "/admin", icon: "lucide:house" },
    { label: "Articles", to: "/admin/articles", icon: "lucide:newspaper" },
    { label: "Gallery", to: "/admin/gallery", icon: "lucide:image" },
    { label: "Contacts", to: "/admin/#", icon: "lucide:mail" },
    { label: "Settings", to: "/admin/#", icon: "lucide:settings-2" }
  ]
</script>

<template>
  <div
    w="full"
    flex="~"
    h="screen"
    overflow="hidden"
  >
    <!-- Side Panel -->
    <aside
      w="250px"
      h="full"
      border-r
      p="5"
    >
      <UiScrollArea class="size-full">
        <PageLogo />

        <ul
          w="full"
          flex="~ col gap-2"
          mt="10"
        >
          <li v-for="item in navItems">
            <ui-button
              class="w-full justify-start bg-background gap-5"
              :icon="item.icon"
              :to="item.to"
              :text="item.label"
              variant="ghost"
            />
          </li>
        </ul>
      </UiScrollArea>
    </aside>

    <!-- Main Content -->
    <div flex="1 ~ col">
      <div
        p="x7 y3"
        border-b
      >
        <p
          font="bold"
          case="capital"
        >
          {{ pageTitle }}
        </p>
      </div>

      <div
        flex="1"
        p="7"
        overflow-y="auto"
      >
        <NuxtPage />
      </div>
    </div>

    <ClientOnly>
      <UiNotivue />
    </ClientOnly>
  </div>
</template>
