<script lang="ts" setup>
  const menuLinks = [
    ...useAppConfig().navigation,
    {
      label: "Privacy Policy",
      link: "/#"
    },
    {
      label: "Login",
      link: "/login"
    }
  ]
  const socialLinks = useAppConfig().info.socialLinks
</script>

<template>
  <footer class="w-full mt-auto bg-secondary">
    <UiContainer class="py-10 space-y-7">
      <!-- Top -->
      <div flex="~ col justify-center md:(row justify-between) items-center">
        <!-- Logo -->
        <PageLogo dark />

        <!-- Links -->
        <ul class="mt-5 flex flex-wrap gap-3 justify-center md:justify-initial">
          <li v-for="item in menuLinks">
            <nuxt-link
              class="hover:underline text-(sm secondary-foreground) font-medium"
              :to="item.link"
              :aria-label="item.label"
              :title="item.label"
            >
              {{ item.label }}
            </nuxt-link>
          </li>
        </ul>
      </div>

      <!-- Bottom -->
      <section flex="~ col items-center justify-between lg:row gap-5 pt-8">
        <p text="sm secondary-foreground">
          &copy; {{ new Date().getFullYear() }} WORI. All rights reserved.
        </p>
        <div flex="~ items-center gap-2">
          <nuxt-link
            v-for="i in socialLinks"
            :to="i.link"
            class="text-secondary-foreground"
          >
            <Icon
              :name="i.icon"
              class="size-5"
              :aria-label="i.label"
            />
          </nuxt-link>
        </div>
      </section>
    </UiContainer>
  </footer>
</template>
