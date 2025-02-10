<template>
  <div
    :class="[styles({ class: props.class }), { 'items-center': hasHintClass }]"
  >
    <UiCheckbox
      :id="inputId"
      v-bind="$attrs"
      :icon="icon"
      :value="value"
      :name="name"
      :required="required"
      :disabled="disabled"
      :checked="checked"
      @update:checked="handleChange"
    />
    <div class="flex flex-col">
      <slot name="label" :error-message="errorMessage" :checked="checked">
        <UiLabel
          v-if="label"
          :for="inputId"
          class="leading-none"
          :class="[errorMessage && 'text-destructive']"
          >{{ label }}</UiLabel
        >
      </slot>
      <TransitionSlide tag="div" group>
        <slot name="hint" :error-message="errorMessage" :checked="checked">
          <p
            v-if="hint && !errorMessage"
            key="hint"
            class="mt-1.5 text-xs leading-none text-muted-foreground"
          >
            {{ hint }}
          </p>
        </slot>
        <slot
          name="errorMessage"
          :error-message="errorMessage"
          :checked="checked"
        >
          <p
            v-if="errorMessage"
            key="errorMessage"
            class="text-sm leading-none text-destructive"
          >
            {{ errorMessage }}
          </p>
        </slot>
      </TransitionSlide>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    label?: string
    icon?: string
    hint?: string
    modelValue?: any
    name?: string
    id?: string
    rules?: any
    validateOnMount?: boolean
    type?: string
    placeholder?: string
    value?: any
    required?: boolean
    disabled?: boolean
    class?: any
  }>()

  const styles = tv({
    base: "flex gap-3"
  })

  const inputId = props.id || useId()

  const hasHintClass = computed(() => {
    return props.hint || useSlots().hint ? "" : "items-center"
  })

  const { errorMessage, checked, handleChange } = useField(
    () => props.name || inputId,
    props.rules,
    {
      initialValue: props.modelValue,
      label: props.label,
      validateOnMount: props.validateOnMount,
      type: "checkbox",
      checkedValue: props.value || true,
      syncVModel: true
    }
  )
</script>
