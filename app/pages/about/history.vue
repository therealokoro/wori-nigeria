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
        class="text-center font-extrabold mb-15"
      >
        About WORI - The History
      </ui-text>

      <!-- Time line content -->
      <UiTimeline class="md:w-70vw mx-auto px-5">
        <UiTimelineItem
          v-for="item in timeline"
          :key="item.id"
          :step="item.id"
        >
          <UiTimelineHeader>
            <UiTimelineSeparator />
            <UiTimelineTitle class="-mt-0.5 text-base font-bold">{{ item.title }}</UiTimelineTitle>
            <UiTimelineIndicator />
          </UiTimelineHeader>
          <UiTimelineContent>
            <ui-text>{{ item.content }}</ui-text>
            <UiTimelineDate class="mb-0 mt-2 text-primary">{{ item.date }}</UiTimelineDate>
          </UiTimelineContent>
        </UiTimelineItem>
      </UiTimeline>
    </PageSection>
  </Page>
</template>

<style lang="css" scoped>
.timeline__dot{
  --uno: 'absolute size-3 bg-primary rounded-full mt-1.5 -start-1.5'
}
</style>
