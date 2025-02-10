<script lang="ts" setup>
  const links = useAppConfig().navigation
  const menuLinks = useActivePageLink(links)
  const isSidebarActive = ref(false)
  useNuxtApp().hook("page:finish", () => {
    isSidebarActive.value = false
  })
</script>

<template>
  <div>
    <!-- Desktop Nav -->
    <UiNavigationMenu class="hidden lg:(flex items-center gap-4)">
      <UiNavigationMenuList class="space-x-4 flex">
        <template v-for="item in menuLinks">
          <!-- Dropdown Items -->
          <UiNavigationMenuItem v-if="item.subLinks">
            <UiDropdownMenu :modal="false">
              <UiDropdownMenuTrigger as-child>
                <button class="navbar__link">{{ item.label }}</button>
              </UiDropdownMenuTrigger>

              <UiDropdownMenuContent
                class="w-50 p-2"
                align="end"
              >
                <UiDropdownMenuItem
                  v-for="sub in item.subLinks"
                  class="flex-1 p-0"
                >
                  <nuxt-link
                    class="block w-full font-semibold p-3"
                    :class="sub.isActive ? 'navbar__link__active' : ''"
                    :to="sub.link"
                    tabindex="1"
                  >
                    {{ sub.label }}
                  </nuxt-link>
                </UiDropdownMenuItem>
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </UiNavigationMenuItem>

          <!-- Normal Items -->
          <UiNavigationMenuItem v-else>
            <UiNavigationMenuLink as-child>
              <nuxt-link
                :to="item.link"
                class="navbar__link"
                :class="item.isActive ? 'navbar__link__active' : ''"
              >
                {{ item.label }}
              </nuxt-link>
            </UiNavigationMenuLink>
          </UiNavigationMenuItem>
        </template>
      </UiNavigationMenuList>
    </UiNavigationMenu>

    <!-- Mobile Navigation -->
    <LazyUiSheet
      v-model:open="isSidebarActive"
      class="w-sm"
    >
      <LazyUiSheetTrigger as-child>
        <ui-icon
          lg="hidden"
          as="button"
          label="Menu Toggle Button"
          type="outline"
          name="tabler:menu-deep"
        />
      </LazyUiSheetTrigger>

      <LazyUiSheetContent>
        <template #content>
          <LazyUiSheetX icon="tabler:x" />
          <div
            class="w-full mt-10"
            orientation="vertical"
          >
            <ul
              class="w-full"
              flex="~ col gap-1"
            >
              <template v-for="item in menuLinks">
                <LazyUiCollapsible v-if="item.subLinks">
                  <LazyUiCollapsibleTrigger class="subnav__link">
                    {{ item.label }}
                  </LazyUiCollapsibleTrigger>
                  <LazyUiCollapsibleContent>
                    <ul class="w-full px-2 border-l-2">
                      <li
                        v-for="sub in item.subLinks"
                        class="w-full"
                      >
                        <nuxt-link
                          class="subnav__link"
                          :class="sub.isActive ? 'navbar__link__active' : ''"
                          :to="sub.link"
                        >
                          {{ sub.label }}
                        </nuxt-link>
                      </li>
                    </ul>
                  </LazyUiCollapsibleContent>
                </LazyUiCollapsible>

                <li v-else>
                  <nuxt-link
                    class="subnav__link"
                    :class="item.isActive ? 'navbar__link__active' : ''"
                    :to="item.link"
                  >
                    {{ item.label }}
                  </nuxt-link>
                </li>
              </template>
            </ul>
          </div>
        </template>
      </LazyUiSheetContent>
    </LazyUiSheet>
  </div>
</template>

<style lang="css" scoped>
  .navbar__link__active {
    --uno: "text-primary underline:(~ offset-5)";
  }

  .navbar__link{
    --uno: 'bg-transparent p-2 text-sm font-semibold hover:text-primary focus-within:highlight'
  }

  .subnav__link{
    --uno: 'bg-transparent block text-left w-full p-3 text-sm font-semibold rounded-$radius hover:bg-primary/10'
  }
</style>
