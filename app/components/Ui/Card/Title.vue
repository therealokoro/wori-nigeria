<template>
  <Primitive :title="title" :class="styles({ class: props.class })" :as="as" :as-child="asChild">
    <slot>
      {{ title }}
    </slot>
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        /** Title to display in the card */
        title?: string;
        /** Custom class(es) to add to the element */
        class?: any;
      }
    >(),
    {
      as: "h3",
    }
  );

  const styles = tv({
    base: "font-bold text-lg leading-5 tracking-tight truncate",
  });
</script>
