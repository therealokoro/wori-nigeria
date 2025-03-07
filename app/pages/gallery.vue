<script lang="ts" setup>
  import VueEasyLightbox, { useEasyLightbox } from "vue-easy-lightbox"

  const { data } = await useFetch("/api/albums/all")
  const images = computed(() => data.value ? data.value : [])

  const { show, onHide, visibleRef, indexRef } = useEasyLightbox({
    imgs: images.value.map(i => i.src),
    initIndex: 0
  })
</script>

<template>
  <Page
    title="Gallery"
    description="View pictures from our programs, events and outreaches"
    contain
  >
    <PageSection
      title="Gallery"
      description="View pictures from our programs, events and outreaches"
    >
      <div
        v-if="images.length"
        class="w-full"
        grid="~ cols-2 md:cols-3 lg:cols-4 gap-5"
      >
        <div
          v-for="(image, i) in images"
          :id="String(i)"
          :key="i"
          class="pic"
          h="200px"
          border
          @click="() => show(i)"
        >
          <NuxtImg
            :id="i"
            :src="image.src"
            :alt="image.title"
            class="image-cover"
            format="webp"
          />
        </div>
      </div>

      <div
        v-else
        class="w-full flex-center"
      >
        <ui-text>Looks like there are no images at the moment</ui-text>
      </div>
    </PageSection>

    <ClientOnly>
      <vue-easy-lightbox
        v-if="images.length"
        teleport="body"
        :visible="visibleRef"
        :imgs="images"
        :index="indexRef"
        :rotate-disabled="true"
        :move-disabled="true"
        @hide="onHide"
      />
    </ClientOnly>
  </Page>
</template>

<style lang="css">
  .vel-modal {
    --uno: "!bg-black/90";
  }

  .vel-img-title {
    --uno: "text-sm! lg:text-lg! !text-black font-bold p-3 bg-white";
  }
</style>
