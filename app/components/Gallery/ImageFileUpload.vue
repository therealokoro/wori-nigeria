<script lang="ts" setup>
interface Props {
  count?: number
  initialImgs?: string[]
  name: string
}

const props = withDefaults(defineProps<Props>(), { count: 6 })

// Reactive array for initial images that remain.
const currentInitialImages = ref<string[]>(props.initialImgs ? [...props.initialImgs] : [])
// Array to store URLs of deleted initial images.

// Arrays for new files and their thumbnails.
const newFiles = ref<File[]>([])
const newThumbnails = ref<string[]>([])

// A computed array that holds all thumbnail URLs (initial images not deleted + new file thumbnails)
const thumbnails = computed<string[]>(() => [
  ...currentInitialImages.value,
  ...newThumbnails.value
])

// Calculate available slots for new uploads.
const imgSlots = computed(() => props.count - currentInitialImages.value.length)

// Update the final field value and show error messages
const { errorMessage, setValue } = useField(props.name, undefined)

// Set up file dialog.
const { onChange, open } = useFileDialog({ accept: "images/*", multiple: true })
onChange((_files: FileList | null) => {
  if (!_files) return
  const fileArr = Array.from(_files)

  // Check if adding these files would exceed the available new slots.
  if (newFiles.value.length + fileArr.length > imgSlots.value) {
    $toast.error(`You can upload a maximum of ${props.count} images in total`)
    return false
  }

  // Validate files.
  const validate = validateImageFileInput(fileArr)
  if (typeof validate === "string") {
    $toast.error({ message: validate })
    return
  }
 else {
    fileArr.forEach((file) => {
      newFiles.value.push(file)
      const objectUrl = useObjectUrl(file).value!
      newThumbnails.value.push(objectUrl)
    })

    setValue(newFiles.value)
  }
})

// Delete handler for a given thumbnail URL.
async function handleDelete(fileUrl: string) {
  const toast = $toast.promise("Deleting image, please wait...")

  // Check if this thumbnail is from the initial images.
  const initialIndex = currentInitialImages.value.indexOf(fileUrl)
  if (initialIndex > -1) {
    try {
      // Delete image from server and remove it from current initial images.
      const msg = await $fetch<string>("/api/albums/delete/image", {
        method: "DELETE",
        query: { fileUrl }
      })

      currentInitialImages.value.splice(initialIndex, 1)
      toast.success(msg)
    }
    catch (e: any) {
      toast.error(e)
    }
  }
 else {
    // Otherwise, check if it's one of the new uploads.
    const newIndex = newThumbnails.value.indexOf(fileUrl)
    if (newIndex > -1) {
      newFiles.value.splice(newIndex, 1)
      newThumbnails.value.splice(newIndex, 1)
      toast.success("Deleted image successfully")
    }
  }

  setValue(newFiles.value)
}

function normalizeUrl(url: string) {
  return url.startsWith("blob:") ? url : `/cdn/images/${url}`
}
</script>

<template>
  <div class="w-full space-y-3">
    <UiLabel>Image Files</UiLabel>

    <div class="border">
      <UiButton
        type="button"
        variant="ghost"
        text="Select Image File(s)"
        @click="open"
      />
    </div>

    <div class="w-full grid grid-cols-2 md:grid-cols-3 gap-5">
      <div
        v-for="(item, index) in thumbnails"
        :key="index"
        class="relative w-full border p-2 flex-center flex-col gap-2"
      >
        <div class="w-full h-25 md:h-30 flex-center">
          <img
            v-if="item"
            :src="normalizeUrl(item)"
            class="w-full h-full object-cover"
          >
        </div>
        <ui-icon
          v-if="item"
          class="absolute top-2 right-2"
          label="Delete Image"
          name="lucide:trash"
          variant="outline"
          @click="handleDelete(item)"
        />
      </div>
    </div>

    <TransitionSlide
      group
      tag="div"
    >
      <p
        v-if="errorMessage"
        key="errorMessage"
        class="mt-1.5 text-sm text-destructive"
      >
        {{ errorMessage }}
      </p>
    </TransitionSlide>
  </div>
</template>
