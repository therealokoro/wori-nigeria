<script lang="ts" setup>
import { UpdateAlbumSchema } from "~~/shared/schemas"

const $album = useAlbumStore()
const id = useRoute().params.id?.toString()
const { data, error } = await useAsyncData(`album-${id}`, () => $album.fetchSingleAlbum({ id }))
const album = computed(() => data.value)

const initialImgs = ref(album.value ? album.value?.images : [])

const form = useForm({
  initialValues: { id, images: [], title: album.value?.title },
  validationSchema: toTypedSchema(UpdateAlbumSchema)
})

const submit = form.handleSubmit(async (v) => {
  const toast = $toast.promise("Updating album, please wait....")
  const body = objectToFormData(v)
  try {
    await $fetch("/api/albums/update", { method: "PUT", body })
    toast.success("Album was updated successfully")
    await navigateTo("/admin/gallery")
  }
 catch (error: any) {
    toast.error(error.data.message)
  }
})

async function handleDeleteAlbum() {
  const toast = $toast.promise("Delete album, please wait....")
  try {
    await $album.deleteAlbum(id)
    toast.success("Album was deleted successfully")
    await navigateTo("/admin/gallery")
  }
  catch (error: any) {
    toast.error(error.data.message)
  }
}
</script>

<template>
  <Page
    title="Edit Album"
    :error
    admin
  >
    <ui-text type="title">Manage Album</ui-text>
    <form @submit="submit">
      <div class="w-full space-y-4 mb-5">
        <UiVeeInput
          type="text"
          name="title"
          label="Album Title"
          placeholder="Enter a title for the album"
        />

        <GalleryImageFileUpload
          name="images"
          :initial-imgs
          :count="6"
        />
      </div>

      <div class="w-full flex gap-4">
        <UiConfirmDialog
          message="Are you sure you want to delete this album?"
          @confirm="handleDeleteAlbum"
        >
          <UiButton
            type="button"
            variant="destructive"
            text="Delete Album"
          />
        </UiConfirmDialog>

        <UiButton
          type="submit"
          text="Update Album"
        />
      </div>
    </form>
  </Page>
</template>
