<template>
  <Primitive :class="styles({ class: props.class })" v-bind="forwarded">
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
  import { reactiveOmit } from "@vueuse/core"
  import { Primitive } from "radix-vue"
  import type { PrimitiveProps } from "radix-vue"

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        class?: any
      }
    >(),
    {
      as: "div"
    }
  )

  const forwarded = reactiveOmit(props, "class")

  const styles = tv({
    base: "f-container"
  })
</script>
