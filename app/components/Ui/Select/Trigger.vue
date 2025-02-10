<template>
  <SelectTrigger :class="styles({ class: props.class })" v-bind="forwarded">
    <span
      v-if="icon"
      class="absolute inset-y-0 left-3 flex items-center justify-center"
    >
      <Icon
        v-if="icon"
        :name="icon"
        class="size-3.5 text-muted-foreground/70"
      />
    </span>
    <slot>
      <UiSelectValue :class="icon ? 'pl-5' : ''" :placeholder="placeholder" />
    </slot>
    <UiSelectIcon :icon="trailingIcon" />
  </SelectTrigger>
</template>

<script lang="ts" setup>
  import { SelectTrigger } from "radix-vue"
  import type { SelectTriggerProps } from "radix-vue"

  const props = defineProps<
    SelectTriggerProps & {
      /** Custom class(es) to add to the parent */
      class?: any
      /** Icon to render */
      icon?: string
      /** Icon to render at the end */
      trailingIcon?: string
      /** Placeholder text */
      placeholder?: string
    }
  >()
  const forwarded = reactiveOmit(
    props,
    "class",
    "icon",
    "trailingIcon",
    "placeholder"
  )
  const styles = tv({
    base: "line-clamp-1 flex h-10 w-full items-center justify-between truncate rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground"
  })
</script>
