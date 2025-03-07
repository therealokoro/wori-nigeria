<script lang="ts" setup>
import { CreateAlbumSchema } from "~~/shared/schemas"

const isModalOpen = ref(false)
const $album = useAlbumStore()

const form = useForm({ validationSchema: toTypedSchema(CreateAlbumSchema) })
const submit = form.handleSubmit(async (v) => {
  const toast = $toast.promise("Creating album, please wait....")
  try {
    await $album.createAlbum(v)
    isModalOpen.value = false
    toast.success("Album was created successfully")
  }
 catch (error: any) {
    toast.error(error.data.message)
  }
})

function disableCloseOnToast(event: Event) {
  const target = event.target as HTMLElement
  if (target?.closest("[data-notivue-toast]")) return event.preventDefault()
}
</script>

<template>
  <UiDialog :open="isModalOpen">
    <UiDialogTrigger as-child>
      <UiButton
        icon="lucide:plus"
        text="Create New Album"
        @click="isModalOpen = true"
      />
    </UiDialogTrigger>
    <UiDialogContent
      class="flex flex-col gap-0 p-0 h-auto sm:max-w-2xl [&>button:last-child]:hidden"
      @interact-outside="disableCloseOnToast($event)"
    >
      <form @submit="submit">
        <div class="overflow-y-auto">
          <UiDialogHeader class="contents space-y-0 text-left">
            <UiDialogTitle
              class="px-6 pt-6 text-base"
              title="Upload Album Images"
            />
          </UiDialogHeader>

          <div class="w-full p-6 space-y-4">
            <UiVeeInput
              type="text"
              name="title"
              label="Album Title"
              placeholder="Enter a title for the album"
            />

            <GalleryImageFileUpload
              name="images"
              :count="6"
            />
          </div>
        </div>

        <UiDialogFooter class="border-t border-border px-6 py-4">
          <UiButton
            type="button"
            variant="outline"
            text="Cancel"
            @click="isModalOpen = false"
          />
          <UiButton
            type="submit"
            text="Upload"
          />
        </UiDialogFooter>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>
