<script lang="ts" setup>
  defineProps<{
    heading: string
    description?: string
  }>()

  const items = [
    { label: "Home", link: "/", icon: "lucide:home" },
    { label: "Components", link: "/", icon: "lucide:component" },
    { label: "Breadcrumb" }
  ]
</script>

<template>
  <section class="page-hero w-full h-(200px md:300px)">
    <UiContainer
      h="full"
      flex="~ col justify-center gap-5"
    >
      <div class="max-w-70vw space-y-2">
        <h1
          text="xl lg:3xl"
          font="black"
        >
          {{ heading }}
        </h1>
        <p
          v-if="description"
          text="sm/6 md:base white/80"
        >
          {{ description }}
        </p>

        <UiBreadcrumbs :items="items" />
      </div>

      <slot />
    </UiContainer>
  </section>
</template>

<style lang="css" scoped></style>
