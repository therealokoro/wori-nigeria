<script lang="ts" setup>
import stats from "~/data/stats.json"
</script>

<template>
  <PageSection bg="muted">
    <div
      w="full"
      grid="~ cols-1 lg:cols-5 gap-10"
    >
      <div
        col-span="1 md:2"
        flex="~ justify-center col gap-4"
        text="center md:left"
      >
        <ui-text type="title">We have a proven track record</ui-text>
        <ui-text>As we work together to build a better future for women and our community, Be a part of our story</ui-text>
      </div>

      <div
        col-span="1 md:3"
        grid="~ cols-1 md:cols-2 gap-5"
      >
        <div
          v-for="i in stats"
          class="p-7 space-y-2 bg-background"
          last="md:col-start-2"
        >
          <ui-text
            class="text-primary"
            type="heading"
          >
            {{ i.figure }}
          </ui-text>
          <ui-text font="semibold">{{ i.title }}</ui-text>
          <ui-text type="small">{{ i.body }}</ui-text>
        </div>
      </div>
    </div>
  </PageSection>
</template>
