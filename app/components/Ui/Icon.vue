<template>
  <component
    :is="elementType"
    :aria-label="label"
    :class="styles().base({ class: props.class, type, size })"
    :disabled="disabled || loading"
    type="button"
    v-bind="forwarded"
  >
    <slot>
      <slot name="icon">
        <Icon
          :name="name"
          :class="styles().icon({ type, size })"
        />
      </slot>

      <span class="sr-only">{{ label }}</span>
    </slot>
  </component>
</template>

<script lang="ts" setup>
  import { useForwardProps } from "radix-vue"
  import type { NuxtLinkProps } from "#app/components"

  const props = withDefaults(
    defineProps<
      NuxtLinkProps & {
        class?: any
        name: string
        type?: VariantProps<typeof styles>["type"]
        size?: VariantProps<typeof styles>["size"]
        disabled?: boolean
        label?: string
        loading?: boolean
        onClick?: any
        as?: string
      }
    >(),
    {
      type: "outline",
      size: "md",
      disabled: false
    }
  )

  const elementType = computed(() => {
    if (props.onClick) return "button"
    if (props.as) return props.as
    if (props.href || props.to || props.target)
      return resolveComponent("NuxtLink")
    return "div"
  })

  const styles = tv({
    slots: {
      base: "flex shrink-0 flex-center rounded-$radius focus:highlight-ring",
      icon: ""
    },
    variants: {
      type: {
        solid: {
          base: "bg-muted",
          icon: "text-muted-foreground"
        },
        outline: {
          base: "border bg-background",
          icon: "text-foreground"
        }
      },
      size: {
        sm: {
          base: "size-5",
          icon: "size-3.5"
        },
        md: {
          base: "size-7.5",
          icon: "size-4"
        }
      }
    },
    defaultVariants: {
      type: "outline",
      size: "md"
    }
  })

  const forwarded = useForwardProps(
    reactiveOmit(props, "class", "name", "size", "as", "loading", "disabled", "type")
  )
</script>
