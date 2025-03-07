<script lang="ts" setup>
import type { IAlbum } from "~~/shared/types"

const $album = useAlbumStore()
const { getCurrAlbumList: albums } = storeToRefs($album)
onBeforeMount(async () => await $album.fetchAlbums())

const initializeEdit = (album: IAlbum) => {
  navigateTo(`/admin/gallery/${album.id}`)
}
</script>

<template>
  <Page
    title="Gallery"
    admin
  >
    <GalleryDialog />

    <div class="w-full">
      <div
        v-if="albums && albums.length"
        class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <button
          v-for="item in albums"
          class="bg-transparent col-span-1 p-6 border focus:highlight-ring"
          flex="center col"
          @click="initializeEdit(item)"
        >
          <Icon
            size="70"
            text="muted-foreground"
            name="lucide:image"
          />
          <div text="center">
            <ui-text font="bold">{{ item.title }}</ui-text>
            <ui-text type="caption">Contains {{ item.images?.length }} Images</ui-text>
          </div>
        </button>
      </div>

      <div
        v-else
        class="flex-center p-10"
      >
        <ui-text>Looks like there are no albums yet to display</ui-text>
      </div>
    </div>
  </Page>
</template>
