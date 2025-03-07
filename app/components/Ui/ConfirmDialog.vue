<script lang="ts" setup>
  defineProps<{ message: string, title?: string, triggerText?: string }>()
  defineEmits(["confirm", "cancel"])
  const model = ref(false)
</script>

<template>
  <UiAlertDialog v-model:open="model">
    <UiAlertDialogTrigger as-child>
      <slot>
        <UiButton variant="outline">{{ triggerText ?? 'Show Dialog' }}</UiButton>
      </slot>
    </UiAlertDialogTrigger>
    <UiAlertDialogContent>
      <UiAlertDialogHeader>
        <UiAlertDialogTitle class="text-base font-extrabold">
          {{ title ?? "Confirm Action!" }}
        </UiAlertDialogTitle>
        <UiAlertDialogDescription>{{ message }}</UiAlertDialogDescription>
      </UiAlertDialogHeader>
      <UiAlertDialogFooter>
        <UiAlertDialogCancel @click="$emit('cancel')" />
        <UiAlertDialogAction @click="$emit('confirm')" />
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
