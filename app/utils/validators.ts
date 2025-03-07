const UPLOAD_SIZE = 1024 * 1024 * 1 // 1MB
const FILE_TYPES = ["jpeg", "jpg", "png", "webp"]

export const validateImageFileInput = (files: File[]) => {
  let error: string | null = null
  files.every((file) => {
    if (!FILE_TYPES.includes(file.name.split(".").pop()!)) {
      error = "Please select an actual image"
      return false
    }
    else if (file.size > UPLOAD_SIZE) {
      error = "File size must be less than 1MB"
      return false
    }
    else return true
  })

  return error
}
