import * as v from "valibot"

export const ImageSchema = v.pipe(
  v.file("Please select an image file."),
  v.mimeType(["image/jpeg", "image/png"], "Please select a JPEG or PNG file."),
  v.maxSize(1024 * 1024 * 1, "Please select a file smaller than 1 MB.")
)

export const CreateAlbumSchema = v.object({
  title: v.pipe(
    v.string("Enter a title for the album"),
    v.nonEmpty("Enter a title for the album"),
    v.maxWords("en", 20, "Should not be more than 20 words")
  ),
  images: v.pipe(
    v.array(ImageSchema, "Please select only image file"),
    v.minLength(1, "Select at least one image"),
    v.maxLength(6, "No more than 6 images are allowed")
  )
})

export const UpdateAlbumSchema = v.object({
  ...CreateAlbumSchema.entries,
  id: v.pipe(v.string("Select an album to edit"), v.nonEmpty("Select an album to edit")),
  images: v.optional(v.array(ImageSchema))
})

export const ArticleSchema = v.object({
  title: v.pipe(
    v.string("A title is required"),
    v.maxWords("en", 20, "Title must be no more than 20 words"),
    v.nonEmpty("A title is required")
  ),
  content: v.pipe(v.string("Content is required"), v.nonEmpty("Content is required")),
  description: v.nullable(
    v.pipe(
      v.string(),
      v.maxWords("en", 20, "Description must be no more than 20 words")
    )
  ),
  coverImage: ImageSchema
})

export const EditArticleSchema = v.object({
  ...ArticleSchema.entries,
  coverImage: v.optional(ArticleSchema.entries.coverImage)
})
