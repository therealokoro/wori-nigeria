<script lang="ts" setup>
  import "~/assets/css/quill-editor.css"
  import { QuillEditor } from "@vueup/vue-quill"

  const toolbar = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline"],
    [{ align: [] }, { list: "ordered" }, { list: "bullet" }, { list: "check" }],
    ["blockquote", { indent: "-1" }, { indent: "+1" }],
    ["link", "image"],
    ["clean"]
  ]

  const props = defineProps<{
    modelValue?: string
    name?: string
    label?: string
    rules?: any
  }>()

  const inputId = useId()

  const { errorMessage, value } = useField(() => props.name || inputId, props.rules, {
    initialValue: props.modelValue,
    label: props.label,
    syncVModel: true
  })
</script>

<template>
  <ClientOnly>
    <div class="w-full">
      <UiLabel mb="2">Content</UiLabel>
      <QuillEditor
        v-model:content="value"
        placeholder="Write your article content here..."
        content-type="html"
        theme="snow"
        :toolbar
      />
      <TransitionSlide
        group
        tag="div"
      >
        <p
          v-if="errorMessage"
          key="errorMessage"
          class="mt-1.5 text-sm text-destructive"
        >
          {{ errorMessage }}
        </p>
      </TransitionSlide>
    </div>
  </ClientOnly>
</template>
