<script lang="ts" setup>
  definePageMeta({
    layout: "empty",
    auth: { only: "user", redirectGuestTo: "/login" }
  })

  useSeoMeta({
    titleTemplate: "%s | Admin Dashboard - WORI",
    description: "Administrative Dashboard"
  })

  const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
  const pageTitle = computed(() => useRoute().path.split("/")[2] || "Dashboard")

  const navItems = useActivePageLink([
    { label: "Overview", link: "/admin", icon: "lucide:house" },
    { label: "Articles", link: "/admin/articles", icon: "lucide:newspaper" },
    { label: "Gallery", link: "/admin/gallery", icon: "lucide:image" },
    { label: "Contacts", link: "/admin/#", icon: "lucide:mail" },
    { label: "Settings", link: "/admin/#", icon: "lucide:settings-2" }
  ], "/admin")

  const isSidebarActive = ref(false)
  useNuxtApp().hook("page:finish", () => {
    isSidebarActive.value = false
  })

  const signOut = async () => await useAuth().signOut({ redirectTo: "/" })
</script>

<template>
  <div w="full">
    <!-- Define Inner Side Panel Content -->
    <DefineTemplate>
      <UiScrollArea class="size-full">
        <ul
          w="full"
          flex="~ col gap-2"
          mt="10"
        >
          <li v-for="item in navItems">
            <ui-button
              class="w-full justify-start gap-5"
              :icon="item.icon"
              :to="item.link"
              :text="item.label"
              :variant="item.isActive ? 'default' : 'ghost'"
            />
          </li>
          <li>
            <UiButton
              class="w-full justify-start gap-5 bg-background"
              icon="lucide:door-open"
              variant="ghost"
              @click="signOut"
            >
              Logout
            </UiButton>
          </li>
        </ul>
      </UiScrollArea>
    </DefineTemplate>

    <div
      w="full"
      flex="~"
      h="screen"
      overflow="hidden"
    >
      <!-- Desktop Side Panel -->
      <aside
        hidden
        sm="block"
        w="250px"
        h="full"
        border-r
        p="5"
      >
        <PageLogo />

        <!-- Use Side Panel Content -->
        <ReuseTemplate />
      </aside>

      <!-- Main Content -->
      <div flex="1 ~ col">
        <div class="flex-horizontal p-(x7 y3) border-b">
          <ui-text class="capitalize font-bold">
            {{ pageTitle }}
          </ui-text>

          <!-- Mobile Side Panel Toggle -->
          <ui-icon
            sm="hidden"
            as="button"
            label="Menu Toggle Button"
            type="outline"
            name="tabler:menu-deep"
            @click="isSidebarActive = true"
          />
        </div>
        <!-- Main Children Page Content -->
        <div class="flex-1 p-7 overflow-y-auto">
          <NuxtPage />
        </div>
      </div>

      <!-- Notification -->
      <ClientOnly>
        <UiNotivue />
      </ClientOnly>

      <!-- Mobile Side Panel -->
      <LazyUiSheet
        v-model:open="isSidebarActive"
        class="w-sm"
      >
        <LazyUiSheetContent>
          <template #content>
            <LazyUiSheetX icon="tabler:x" />
            <div
              class="w-full"
              orientation="vertical"
            >
              <!-- Use Side Panel Content -->
              <ReuseTemplate />
            </div>
          </template>
        </LazyUiSheetContent>
      </LazyUiSheet>
    </div>
  </div>
</template>
