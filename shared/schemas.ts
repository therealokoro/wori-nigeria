import * as v from "valibot"
import { createInsertSchema } from "drizzle-valibot"
import { Messages } from "~~/server/database/models"

export const ImageSchema = v.pipe(
  v.file("Please select an image file."),
  v.mimeType(["image/jpeg", "image/jpg", "image/png"], "Please select only image files."),
  v.maxSize(1024 * 1024 * 2, "Please select a file not larger than 2 MB.")
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

export const CreateMessageSchema = createInsertSchema(Messages, {
  firstname: s => v.pipe(s, v.nonEmpty("Please enter your firstname")),
  lastname: s => v.pipe(s, v.nonEmpty("Please enter your lastname")),
  email: s => v.pipe(s, v.nonEmpty("Please enter your email")),
  body: s => v.pipe(s, v.nonEmpty("Please enter your message"))
})

export const UpdateMessageSchema = v.object({
  isReply: v.optional(v.boolean()),
  isRead: v.optional(v.boolean()),
  response: v.optional(v.string()),
  id: v.pipe(v.string("Please select a message to reply"))
})
