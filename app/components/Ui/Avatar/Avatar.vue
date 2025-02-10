<template>
  <AvatarRoot
    :as="as"
    :as-child="asChild"
    :class="styles({ class: props.class, size })"
  >
    <slot>
      <slot name="image">
        <UiAvatarImage
          v-if="src"
          :src="src"
          :alt="alt"
          :class="imageClass"
          @loading-status-change="emits('loadingStatusChange', $event)"
        />
      </slot>
      <slot name="fallback">
        <UiAvatarFallback
          :delay-ms="delayMs"
          :class="fallbackClass"
          :fallback="fallback"
        />
      </slot>
    </slot>
  </AvatarRoot>
</template>

<script lang="ts" setup>
  import { AvatarRoot } from "radix-vue"
  import type {
    AvatarImageEmits,
    AvatarImageProps,
    AvatarRootProps
  } from "radix-vue"

  const props = withDefaults(
    defineProps<
      AvatarRootProps &
        Partial<AvatarImageProps> & {
          class?: any
          size?: AvatarProps['size']
          imageClass?: any
          fallbackClass?: any
          alt?: string
          fallback?: string
          delayMs?: number
        }
    >(),
    {
      class: undefined,
      size: undefined,
      imageClass: undefined,
      fallbackClass: undefined,
      alt: undefined,
      fallback: undefined,
      delayMs: undefined
    }
  )

  const emits = defineEmits<AvatarImageEmits>()
  type AvatarProps = VariantProps<typeof styles>
  const styles = tv({
    base: "relative flex shrink-0 overflow-hidden rounded-full",
    variants: {
      size: {
        md: "size-10",
        sm: "size-8"
      }
    },
    defaultVariants: {
      size: "md"
    }
  })
</script>
