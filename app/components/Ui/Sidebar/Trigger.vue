<template>
  <!-- <UiButton
    :title="label"
    data-sidebar="trigger"
    variant="outline"
    size="icon"
    @click="toggleSidebar"
  >
    <slot v-bind="{ state }">
      <Icon v-if="icon" :name="icon" />
      <span class="sr-only">{{ label }}</span>
    </slot>
  </UiButton> -->

  <UiIcon
    as="button"
    v-bind="{ state }"
    :name="icon"
    :label="label"
    data-sidebar="trigger"
    @click="toggleSidebar()"
  />
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from "vue"
  const props = withDefaults(
    defineProps<{
      /**
       * The icon to display in the trigger.
       * @default "lucide:panel-left"
       */
      icon?: string
      /**
       * Additional classes to apply to the parent element.
       */
      class?: HTMLAttributes["class"]
      /**
       * The label for the trigger.
       * @default "Toggle Sidebar"
       */
      label?: string
    }>(),
    {
      icon: "lucide:panel-left",
      label: "Toggle Sidebar"
    }
  )

  const { toggleSidebar, state } = useSidebar()
</script>
