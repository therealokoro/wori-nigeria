<script setup lang="ts">
// Types
type FileMetadata = {
  name: string
  size: number
  type: string
  url: string
  id: string
}

type FileWithPreview = {
  file: File | FileMetadata
  id: string
  preview?: string
}

type FileUploadProps = {
  maxFiles?: number
  maxSize?: number
  accept?: string
  multiple?: boolean
  name: string
  initialFiles?: FileMetadata[]
}

// Props
const props = withDefaults(defineProps<FileUploadProps>(), {
  maxFiles: 6,
  maxSize: 2 * 1024 * 1024, // 2MB default
  accept: "image/png,image/jpeg,image/jpg,image/webp",
  multiple: true,
  initialFiles: () => []
})

// Emits
const emit = defineEmits<{
  "files-change": [files: FileWithPreview[]]
  "files-added": [files: FileWithPreview[]]
}>()

// State
const files: Ref<FileWithPreview[]> = ref([])
const isDragging = ref(false)
const errors = ref<string[]>([])
const fileInputRef = ref<HTMLInputElement | null>(null)
const { errorMessage, setValue } = useField(props.name, undefined)

// Format bytes to human-readable format
const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

// Computed
const maxSizeMB = computed(() => props.maxSize / (1024 * 1024))

// Methods
const validateFile = (file: File | FileMetadata): string | null => {
  if (file instanceof File) {
    if (file.size > props.maxSize) {
      return `File "${file.name}" exceeds the maximum size of ${formatBytes(props.maxSize)}.`
    }
  }
 else {
    if (file.size > props.maxSize) {
      return `File "${file.name}" exceeds the maximum size of ${formatBytes(props.maxSize)}.`
    }
  }

  if (props.accept !== "*") {
    const acceptedTypes = props.accept.split(",").map(type => type.trim())
    const fileType = file instanceof File ? file.type || "" : file.type
    const fileExtension = `.${file instanceof File ? file.name.split(".").pop() : file.name.split(".").pop()}`

    const isAccepted = acceptedTypes.some((type) => {
      if (type.startsWith(".")) {
        return fileExtension.toLowerCase() === type.toLowerCase()
      }
      if (type.endsWith("/*")) {
        const baseType = type.split("/")[0]
        return fileType.startsWith(`${baseType}/`)
      }
      return fileType === type
    })

    if (!isAccepted) {
      return `File "${file instanceof File ? file.name : file.name}" is not an accepted file type.`
    }
  }

  return null
}

const createPreview = (file: File | FileMetadata): string | undefined => {
  if (file instanceof File) {
    return URL.createObjectURL(file)
  }
  return file.url
}

const generateUniqueId = (file: File | FileMetadata): string => {
  if (file instanceof File) {
    return `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
  }
  return file.id
}

const clearFiles = () => {
  // Clean up object URLs
  files.value.forEach((file) => {
    if (file.preview && file.file instanceof File && file.file.type.startsWith("image/")) {
      URL.revokeObjectURL(file.preview)
    }
  })

  if (fileInputRef.value) {
    fileInputRef.value.value = ""
  }

  files.value = []
  errors.value = []
  emit("files-change", [])
}

const addFiles = (newFiles: FileList | File[]) => {
  if (!newFiles || newFiles.length === 0) return

  const newFilesArray = Array.from(newFiles)
  const newErrors: string[] = []

  // Clear existing errors when new files are uploaded
  errors.value = []

  // In single file mode, clear existing files first
  if (!props.multiple) {
    clearFiles()
  }

  // Check if adding these files would exceed maxFiles (only in multiple mode)
  if (props.multiple && props.maxFiles !== Number.POSITIVE_INFINITY && files.value.length + newFilesArray.length > props.maxFiles) {
    newErrors.push(`You can only upload a maximum of ${props.maxFiles} files.`)
    errors.value = newErrors
    return
  }

  const validFiles: FileWithPreview[] = []

  newFilesArray.forEach((file) => {
    // Check for duplicates
    const isDuplicate = files.value.some(
      existingFile => existingFile.file.name === file.name && existingFile.file.size === file.size
    )

    // Skip duplicate files silently
    if (isDuplicate) {
      return
    }

    // Validate file
    const error = validateFile(file)
    if (error) {
      newErrors.push(error)
    }
    else {
      validFiles.push({
        file,
        id: generateUniqueId(file),
        preview: createPreview(file)
      })
    }
  })

  // Only update state if we have valid files to add
  if (validFiles.length > 0) {
    // Call the onFilesAdded callback with the newly added valid files
    emit("files-added", validFiles)

    const newFiles = !props.multiple ? validFiles : [...files.value, ...validFiles]
    files.value = newFiles
    emit("files-change", newFiles)
  }

  if (newErrors.length > 0) {
    errors.value = newErrors
  }

  // Reset input value after handling files
  if (fileInputRef.value) {
    fileInputRef.value.value = ""
  }
}

const removeFile = (id: string) => {
  const fileToRemove = files.value.find(file => file.id === id)
  if (fileToRemove && fileToRemove.preview && fileToRemove.file instanceof File && fileToRemove.file.type.startsWith("image/")) {
    URL.revokeObjectURL(fileToRemove.preview)
  }

  const newFiles = files.value.filter(file => file.id !== id)
  files.value = newFiles
  errors.value = []
  emit("files-change", newFiles)
}

const handleDragEnter = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
  isDragging.value = true
}

const handleDragLeave = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()

  // Only set isDragging to false if we're leaving the drop zone
  // and not entering a child element
  if (e.currentTarget.contains(e.relatedTarget as Node)) {
    return
  }

  isDragging.value = false
}

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
  isDragging.value = false

  // Don't process files if the input is disabled
  if (fileInputRef.value?.disabled) {
    return
  }

  if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
    // In single file mode, only use the first file
    if (!props.multiple) {
      const file = e.dataTransfer.files[0]
      addFiles([file])
    }
    else {
      addFiles(e.dataTransfer.files)
    }
  }
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    addFiles(target.files)
  }
}

const openFileDialog = () => {
  fileInputRef.value?.click()
}

// Initialize with initial files
onMounted(() => {
  if (props.initialFiles.length > 0) {
    files.value = props.initialFiles.map(file => ({
      file,
      id: file.id,
      preview: file.url
    }))
  }
})

// Clean up object URLs when component is unmounted
onBeforeUnmount(() => {
  files.value.forEach((file) => {
    if (file.preview && file.file instanceof File && file.file.type.startsWith("image/")) {
      URL.revokeObjectURL(file.preview)
    }
  })
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <!-- Drop area -->
    <div
      :class="[
        'border-input relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors',
        isDragging ? 'bg-accent/50' : '',
        files.length === 0 ? 'justify-center' : '',
        'has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 has-[input:focus]:ring-[3px]',
      ]"
      @dragenter="handleDragEnter"
      @dragleave="handleDragLeave"
      @dragover="handleDragOver"
      @drop="handleDrop"
    >
      <input
        ref="fileInputRef"
        type="file"
        :accept="props.accept"
        :multiple="props.multiple"
        class="sr-only"
        aria-label="Upload image file"
        @change="handleFileChange"
      >

      <div
        v-if="files.length > 0"
        class="flex w-full flex-col gap-3"
      >
        <div class="flex items-center justify-between gap-2">
          <h3 class="truncate text-sm font-medium">Uploaded Files ({{ files.length }})</h3>
          <button
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
            :disabled="files.length >= props.maxFiles"
            @click="openFileDialog"
          >
            <Icon
              name="lucide:upload"
              class="-ms-0.5 size-3.5 opacity-60"
              aria-hidden="true"
            />
            Add more
          </button>
        </div>

        <div class="flex flex-wrap gap-5">
          <div
            v-for="file in files"
            :key="file.id"
            class="bg-accent relative aspect-square h-30 rounded-md ring-5 ring-primary/30"
          >
            <img
              :src="file.preview"
              :alt="file.file.name"
              class="size-full rounded-[inherit] object-cover"
            >
            <ui-icon
              class="absolute -top-2 -right-2"
              aria-label="Remove image"
              name="lucide:x"
              @click="() => removeFile(file.id)"
            />
          </div>
        </div>
      </div>

      <div
        v-else
        class="flex flex-col items-center justify-center px-4 py-3 text-center"
      >
        <div
          class="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
          aria-hidden="true"
        >
          <Icon
            name="lucide:image"
            class="size-4 opacity-60"
          />
        </div>
        <div class="my-3">
          <p class="mb-1.5 text-sm font-medium">Drop your images here</p>
          <p class="text-muted-foreground text-xs">SVG, PNG, JPG or GIF (max. {{ maxSizeMB }}MB)</p>
        </div>
        <ui-button
          icon="lucide:upload"
          variant="outline"
          text="Select images"
          @click="openFileDialog"
        />
      </div>
    </div>

    <div
      v-if="errors.length > 0"
      class="text-destructive flex items-center gap-1 text-xs"
      role="alert"
    >
      <Icon
        name="lucide:alert-cirlce"
        class="size-3 shrink-0"
      />
      <span>{{ errors[0] }}</span>
    </div>

    <p
      aria-live="polite"
      role="region"
      class="text-muted-foreground mt-2 text-center text-xs"
    >
      Multiple image uploader w/ image grid ∙
      <a
        href="https://github.com/origin-space/originui/tree/main/docs/use-file-upload.md"
        class="hover:text-foreground underline"
      >
        API
      </a>
    </p>
  </div>
</template>
