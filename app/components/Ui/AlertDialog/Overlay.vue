<template>
  <AlertDialogOverlay
    v-bind="forwarded"
    :class="styles({ class: props.class })"
  />
</template>

<script lang="ts" setup>
  import { AlertDialogOverlay } from "radix-vue"
  import type { AlertDialogOverlayProps } from "radix-vue"

  const props = defineProps<
    AlertDialogOverlayProps & {
      /** Custom class(es) to add to the overlay */
      class?: any
    }
  >()
  const forwarded = reactiveOmit(props, "class")
  const styles = tv({
    base: "fixed inset-0 z-50 bg-gray/20 backdrop-blur-3 data-[state=closed]:animate-fadeOut data-[state=open]:animate-fadeIn"
  })
</script>
