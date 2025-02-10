<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="styles({ class: props.class })"
  >
    <slot>
      <slot name="image" />
      <slot name="header" />

      <UiCardContent :class="contentClass">
        <slot name="content">
          <div class="flex flex-col space-y-3">
            <slot name="title">
              <UiCardTitle
                v-if="title || $slots.title"
                class="card-title"
                :title="title"
              />
            </slot>
            <slot name="description">
              <UiCardDescription
                v-if="description || $slots.description"
                class="card-description"
                :description="description"
              />
            </slot>

            <slot name="meta">
              <p class="card-meta text-sm/5 text-muted-foreground">
                {{ meta }}
              </p>
            </slot>
          </div>
        </slot>
      </UiCardContent>
      <slot name="footer" />
    </slot>
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "radix-vue"
  import type { PrimitiveProps } from "radix-vue"

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        /** Title that should be displayed. Passed to the `CardTitle` component */
        title?: string
        /** Description that should be displayed. Passed to the `CardDescription` component */
        description?: string
        /** Meta information that should be displayed */
        meta?: string
        /** Custom class(es) to add to the element */
        class?: any
        /** Custom class(es) to add to the element */
        contentClass?: any
      }
    >(),
    {
      as: "div",
      title: undefined,
      description: undefined,
      class: undefined,
      contentClass: undefined
    }
  )

  const styles = tv({
    base: "rounded-$radius border bg-card text-card-foreground shadow-sm"
  })
</script>
