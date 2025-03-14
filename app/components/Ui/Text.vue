<script setup lang="ts">
  import { useForwardProps } from "radix-vue"
  import { reactiveOmit } from "@vueuse/core"
  import type { HTMLAttributes } from "vue"

  const textStyles = tv({
    base: "text-inherit", // Common base styles
    variants: {
      type: {
        headline: "font-black text-2xl/tight md:text-4xl",
        heading: "font-bold text-xl md:text-2xl",
        title: "font-extrabold text-lg md:text-xl",
        subtitle: "font-semibold text-md/6 md:text-lg/6",
        body: "text-[0.9rem]/loose md:text-md/loose",
        small: "text-sm/loose",
        caption: "text-xs"
      }
    },
    defaultVariants: {
      type: "body"
    }
  })

  type TextProps = VariantProps<typeof textStyles>
  const props = withDefaults(
    defineProps<{
      type?: TextProps["type"]
      class?: HTMLAttributes["class"]
      as?: keyof HTMLElementTagNameMap
    }>(),
    {
      type: "body"
    }
  )

  const forwarded = useForwardProps(
    reactiveOmit(props, "class", "as", "type")
  )
  const computedTag = computed(() => {
    if (props.as) return props.as
    switch (props.type) {
      case "headline":
        return "h1"
      case "heading":
        return "h2"
      case "title":
        return "h3"
      case "subtitle":
        return "h4"
      case "caption":
        return "span"
      default:
        return "p"
    }
  })
</script>

<template>
  <component
    :is="computedTag"
    :class="textStyles({ class: props.class, type })"
    v-bind="forwarded"
  >
    <slot />
  </component>
</template>
