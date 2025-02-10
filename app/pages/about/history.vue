<script lang="ts" setup>
import timeline from "~/data/timeline.json"
</script>

<template>
  <Page
    title="History"
    description="Learn about how WORI came about to be"
  >
    <PageSection>
      <ui-text
        type="heading"
        class="text-center font-extrabold mb-10"
      >
        About WORI - The History
      </ui-text>

      <div class="max-w-4xl mx-auto px-5">
        <!-- Time line content -->
        <ol class="flex-1 relative border-s border-gray-200">
          <li
            v-for="item in timeline"
            class="mb-10 ms-4"
          >
            <div class="timeline__dot" />
            <ui-text type="subtitle">{{ item.title }}</ui-text>
            <ui-text class="mt-3 text-justify">{{ item.content }}</ui-text>
          </li>
        </ol>
      </div>
    </PageSection>
  </Page>
</template>

<style lang="css" scoped>
.timeline__dot{
  --uno: 'absolute size-3 bg-primary rounded-full mt-1.5 -start-1.5'
}
</style>
