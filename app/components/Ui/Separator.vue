<template>
  <div
    v-if="text && orientation === 'horizontal'"
    class="flex items-center gap-2"
  >
    <Separator
      v-bind="forwarded"
      :class="[separatorClass, 'flex-1']"
    />
    <span class="text-sm text-muted-foreground whitespace-nowrap">{{ text }}</span>
    <Separator
      v-bind="forwarded"
      :class="[separatorClass, 'flex-1']"
    />
  </div>
  <Separator
    v-else
    v-bind="forwarded"
    :class="separatorClass"
  />
</template>

<script lang="ts" setup>
import { Separator, useForwardProps } from "radix-vue"
import type { SeparatorProps } from "radix-vue"

const props = withDefaults(
  defineProps<SeparatorProps & { class?: any, text?: string }>(),
  {
    orientation: "horizontal"
  }
)

const forwarded = useForwardProps(reactiveOmit(props, "class", "text"))

const styles = tv({
  base: "shrink-0 bg-border",
  variants: {
    orientation: {
      horizontal: "h-[1px] w-full",
      vertical: "h-full w-[1px]"
    }
  }
})

const separatorClass = styles({ orientation: props.orientation, class: props.class })
</script>
