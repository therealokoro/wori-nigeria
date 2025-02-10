<template>
  <div>
    <template
      v-for="(field, index) in fields"
      :key="index"
    >
      <template v-if="field.variant === 'Checkbox'">
        <slot
          v-if="field.renderIf ? field.renderIf() : true"
          :name="field.slot ? field.slot : field.name"
          v-bind="field"
        >
          <div :class="field.wrapperClass">
            <UiVeeCheckbox v-bind="removeFields(field)" />
          </div>
        </slot>
      </template>
      <template v-if="field.variant === 'Input'">
        <slot
          v-if="field.renderIf ? field.renderIf() : true"
          :name="field.slot ? field.slot : field.name"
          v-bind="field"
        >
          <div :class="field.wrapperClass">
            <UiVeeInput v-bind="removeFields(field)" />
          </div>
        </slot>
      </template>
      <template v-if="field.variant === 'Divider'">
        <slot
          v-if="field.renderIf ? field.renderIf() : true"
          :name="field.slot ? field.slot : field.name"
          v-bind="field"
        >
          <div :class="field.wrapperClass">
            <UiDivider v-bind="removeFields(field)" />
          </div>
        </slot>
      </template>
      <template v-if="field.variant === 'Textarea'">
        <slot
          v-if="field.renderIf ? field.renderIf() : true"
          :name="field.slot ? field.slot : field.name"
          v-bind="field"
        >
          <div :class="field.wrapperClass">
            <UiVeeTextarea v-bind="removeFields(field)" />
          </div>
        </slot>
      </template>
      <template v-if="field.variant === 'FileInput'">
        <slot
          v-if="field.renderIf ? field.renderIf() : true"
          :name="field.slot ? field.slot : field.name"
          v-bind="field"
        >
          <div :class="field.wrapperClass">
            <UiVeeFileInput
              :name="field.name"
              v-bind="removeFields(field)"
            />
          </div>
        </slot>
      </template>
      <template v-if="field.variant === 'Select'">
        <slot
          v-if="field.renderIf ? field.renderIf() : true"
          :name="field.slot ? field.slot : field.name"
          v-bind="field"
        >
          <div :class="field.wrapperClass">
            <UiVeeSelect
              v-bind="removeFields(field)"
              :options="field.options as SelectOptions"
            />
          </div>
        </slot>
      </template>
      <template v-if="field.variant === 'RadioGroup'">
        <slot
          v-if="field.renderIf ? field.renderIf() : true"
          :name="field.slot ? field.slot : field.name"
          v-bind="field"
        >
          <div :class="field.wrapperClass">
            <UiVeeRadioGroup
              :name="field.name"
              v-bind="removeFields(field)"
            >
              <template
                v-for="(option, optIndex) in field.options"
                :key="optIndex"
              >
                <div class="mb-2 flex items-center gap-3">
                  <UiRadioGroupItem
                    :id="option.value"
                    :value="option.value"
                  />
                  <UiLabel :for="option.value">{{ option.label }}</UiLabel>
                </div>
              </template>
            </UiVeeRadioGroup>
          </div>
        </slot>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
export type FormBuilder = {
    description?: string
    hint?: string
    disabled?: boolean
    label?: string
    name: string
    placeholder?: string
    required?: boolean
    type?: string
    value?: any
    rules?: any
    class?: any
    slot?: string
    wrapperClass?: any
    renderIf?: () => boolean
    options?: any[]
    variant:
      | "Checkbox"
      | "Input"
      | "Divider"
      | "FileInput"
      | "Select"
      | "Textarea"
      | "PinInput"
      | "RadioGroup"
    [key: string]: any
  }
  export type FormBuilderProps = {
    fields: FormBuilder[]
  }

  type SelectOptions = { label: string, value: any, disabled?: boolean }[]
</script>

<script lang="ts" setup>
  defineProps<FormBuilderProps>()

  const omit = (obj: FormBuilder, keys: Array<keyof FormBuilder>) =>
    Object.fromEntries(
      Object.entries(obj).filter(([key]) => !keys.includes(key as keyof FormBuilder))
    )

  const removeFields = (field: FormBuilder) => {
    return omit(field, ["wrapperClass", "renderIf", "variant", "slot"])
  }
</script>
