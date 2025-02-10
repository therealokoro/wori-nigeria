<template>
  <div class="w-full">
    <UiLabel
      v-if="label"
      :for="inputId"
      :class="[errorMessage && 'text-destructive', 'mb-2']"
    >
      <span>{{ label }}
        <span
          v-if="required"
          class="text-destructive"
        >*</span></span>
    </UiLabel>
    <div class="relative">
      <UiSelect
        :id="inputId"
        v-model="value"
        v-bind="$attrs"
        :class="[hasIcon && 'pl-9']"
        :required="required"
        :trailing-icon="trailingIcon"
        :name="name"
        @blur="handleBlur"
      >
        <UiSelectTrigger
          :icon="icon"
          :placeholder="placeholder"
        />
        <UiSelectContent>
          <UiSelectItem
            v-for="(item, i) in renderList"
            :key="i"
            :value="item.value"
            :disabled="item.disabled"
            :text="item.label"
          />
          <!-- <UiSelectGroup>
            <UiSelectItem
              v-for="(veg, i) in vegetables"
              :key="i"
              :value="veg"
              :text="veg"
            />
          </UiSelectGroup> -->
        </UiSelectContent>
      </UiSelect>
    </div>
    <TransitionSlide
      group
      tag="div"
    >
      <p
        v-if="hint && !errorMessage"
        key="hint"
        class="mt-1.5 text-sm text-muted-foreground"
      >
        {{ hint }}
      </p>

      <p
        v-if="errorMessage"
        key="errorMessage"
        class="mt-1.5 text-sm text-destructive"
      >
        {{ errorMessage }}
      </p>
    </TransitionSlide>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      label?: string
      icon?: string
      hint?: string
      modelValue?: string
      name?: string
      id?: string
      rules?: any
      placeholder?: string
      options:
        | { label: string, value: any, disabled?: boolean }[]
        | Array<string | number>
      validateOnMount?: boolean
      type?: string
      trailingIcon?: string
      required?: boolean
    }>(),
    {
      placeholder: "Select an option"
    }
  )

  const renderList = computed(() => {
    return props.options.map((c) => {
      if (typeof c === "object") return c
      else return { label: String(c), value: c }
    })
  })

  const inputId = props.id || useId()

  const hasIcon = computed(
    () => Boolean(props.icon) || Boolean(useSlots().icon)
  )

  const { errorMessage, value, handleBlur } = useField(
    () => props.name || inputId,
    props.rules,
    {
      initialValue: props.modelValue,
      label: props.label,
      validateOnMount: props.validateOnMount,
      syncVModel: true
    }
  )
</script>
