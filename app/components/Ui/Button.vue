<template>
  <component
    :is="elementType"
    :class="
      buttonStyles({
        disabled: disabled || loading,
        class: props.class,
        variant,
        effect,
        size,
      })
    "
    :disabled="disabled || loading"
    v-bind="forwarded"
  >
    <slot name="iconLeft">
      <Icon
        size="14"
        v-if="resolveIcon"
        :class="{ 'animate-spin': loading }"
        :name="resolveIcon"
      />
    </slot>

    <slot>
      <span v-if="text">{{ text }}</span>
    </slot>

    <slot name="iconRight">
      <Icon size="14" v-if="iconRight" :name="iconRight" />
    </slot>
  </component>
</template>

<style lang="css" scoped>
  .base-icon {
    --uno: "w-0 flex items-center justify-center shrink-0 opacity-0 transition-all duration-200 group-hover:w-6 group-hover:opacity-100";
  }
</style>

<script setup lang="ts">
  import { reactiveOmit } from "@vueuse/core"
  import { useForwardProps } from "radix-vue"
  import type { NuxtLinkProps } from "#app/components"

  type ButtonProps = VariantProps<typeof buttonStyles>
  const props = withDefaults(
    defineProps<
      NuxtLinkProps & {
        /** The type fro the button */
        type?: "button" | "submit" | "reset"
        /** Whether the button is disabled */
        disabled?: boolean
        /** Whether the button is loading */
        loading?: boolean
        /** The action to perform when the button is clicked */
        onClick?: any
        /** The element to render the button as */
        as?: string
        /** Custom class(es) to add to parent element */
        class?: any
        /** The variant of the button */
        variant?: ButtonProps["variant"]
        /** Add effects to the button */
        effect?: ButtonProps["effect"]
        /** The size of the button */
        size?: ButtonProps["size"]
        /** The text to display in the button */
        text?: string
        /** An icon to display on the left of the button */
        icon?: string
        /** An icon to display on the right of the button */
        iconRight?: string
      }
    >(),
    {
      loading: false,
      type: "button"
    }
  )

  const elementType = computed(() => {
    if (props.as) return props.as
    if (props.href || props.to || props.target)
      return resolveComponent("NuxtLink")
    return "button"
  })

  const resolveIcon = computed(() => {
    if (props.loading) return "mingcute:loading-line"
    else if (props.icon) return props.icon
  })

  const forwarded = useForwardProps(
    reactiveOmit(
      props,
      "class",
      "text",
      "icon",
      "iconRight",
      "effect",
      "size",
      "variant",
      "as",
      "loading",
      "disabled"
    )
  )
</script>
