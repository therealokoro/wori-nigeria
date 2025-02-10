<script lang="ts" setup>
import services from "~/data/services.json"
</script>

<template>
  <Page title="Our Services">
    <PageSection>
      <ui-text
        type="heading"
        class="text-center font-extrabold mb-15"
      >
        Our Services
      </ui-text>

      <div
        class="w-full"
        grid="~ cols-1 md:cols-2 lg:cols-3 gap-10"
      >
        <div
          v-for="i in services"
          class="service"
        >
          <div class="service__card w-full h-40 flex-center p-10">
            <Icon
              :name="i.icon"
              class="text-5xl"
            />
          </div>

          <div class="text-center space-y-5">
            <ui-text class="text-primary font-semibold">
              {{ i.title }}
            </ui-text>
            <ui-text>{{ i.body }}</ui-text>
          </div>
        </div>
      </div>
    </PageSection>
  </Page>
</template>

<style lang="css" scoped>
.service{
  --uno: 'w-full flex flex-col lg:flex-row flex-wrap gap-10'
}

.service__card {
  background-image: url('/patterns.svg')
}
</style>
