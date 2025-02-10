<script lang="ts" setup>
  import testimonials from "~/data/testimonials.json"
</script>

<template>
  <PageSection
    title="Some Testimonials"
    bg="primary"
    text="primary-foreground"
  >
    <div
      w="full"
      inline="grid"
      grid="cols-1 md:cols-2 lg:cols-3 gap-7"
    >
      <div
        v-for="item in testimonials"
        h="max"
        p="6 sm:8"
        bg="background"
        rounded="$radius"
        text="foreground"
      >
        <ui-text
          type="small"
          class="italic font-medium"
        >
          {{ item.quote }}
        </ui-text>

        <div
          flex="~ items-center justify-end gap-4"
          mt="5"
        >
          <div text="right">
            <ui-text
              as="p"
              type="caption"
              class="font-semibold text-primary"
            >
              {{ item.name }}
            </ui-text>
            <ui-text type="caption">{{ item.title }}</ui-text>
          </div>
          <UiIcon name="mingcute:message-4-line" />
        </div>
      </div>
    </div>
  </PageSection>
</template>
