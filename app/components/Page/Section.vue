<script lang="ts" setup>
  import { useForwardProps } from "radix-vue"

  const props = defineProps<{
    class?: string
    innerClass?: string
    title?: string
    description?: string | null
    meta?: string
    titleLeft?: string
  }>()

  const styles = tv({ base: "py-10 md:py-15" })
  const innerStyles = tv({ base: "mb-10 md:max-w-70vw" })
  const forward = useForwardProps(reactiveOmit(props, "class", "title", "titleLeft"))
  const title = computed(() => props.titleLeft ? props.titleLeft : props.title ? props.title : null)
</script>

<template>
  <!-- Page Section Content -->
  <section
    :class="styles({ class: props.class })"
    v-bind="forward"
  >
    <UiContainer>
      <div
        v-if="title"
        :class="[
          innerStyles({ class: props.innerClass }),
          titleLeft ? ' text-left' : 'text-center mx-auto',
        ]"
      >
        <ui-text type="title">{{ title }}</ui-text>
        <ui-text
          v-if="description"
          type="body"
          class="mt-2"
        >
          {{ description }}
        </ui-text>
        <ui-text
          v-if="meta"
          type="caption"
          class="text-gray-400 font-medium"
        >
          {{ meta }}
        </ui-text>
      </div>

      <slot />
    </UiContainer>
  </section>
</template>
