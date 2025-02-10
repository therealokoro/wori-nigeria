<template>
  <NavigationMenuRoot
    :class="styles({ class: props.class, orientation: props.orientation })"
    v-bind="forwarded"
  >
    <slot />
    <slot name="viewport">
      <UiNavigationMenuViewport />
    </slot>
  </NavigationMenuRoot>
</template>

<script lang="ts" setup>
  import { NavigationMenuRoot, useForwardPropsEmits } from "radix-vue"
  import type { NavigationMenuRootEmits, NavigationMenuRootProps } from "radix-vue"

  const props = defineProps<
    NavigationMenuRootProps & {
      /** Custom class(es) to add to the parent */
      class?: any
    }
  >()
  const emits = defineEmits<NavigationMenuRootEmits>()
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits)

  const styles = tv({
    base: "relative flex flex-1 ",
    variants: {
      orientation: {
        vertical: "items-start",
        horizontal: "max-w-max items-center justify-center"
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    }
  })
</script>
