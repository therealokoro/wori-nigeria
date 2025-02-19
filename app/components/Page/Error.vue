<script setup lang="ts">
  import type { NuxtError } from "#app"

  const { error } = defineProps<{ error: NuxtError<any> }>()
  const title = computed(() => error.statusMessage ?? "An error occured")
  const message = computed(() => {
    const def = "This could be a mistake or an internal error. Let's help you get your way around"
    return error.data?.message ?? def
  })

  useSeoMeta({ title: title.value })
</script>

<template>
  <div
    min-h="70vh"
    flex="col center gap-3"
    text="center"
  >
    <h1
      text="md:xl foreground"
      font="extrabold"
    >
      {{ title }}
    </h1>
    <p
      lt-md="text-sm/5"
      text="primary"
    >
      {{ message }}
    </p>
    <div flex="center gap-2">
      <ui-button
        variant="outline"
        text="Previous Page"
        @click="$router.go(-1)"
      />
      <ui-button
        to="/"
        text="Go back home"
      />
    </div>
  </div>
</template>
