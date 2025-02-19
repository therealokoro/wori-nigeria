import * as v from "valibot"

export const ArticleSchema = v.object({
  title: v.pipe(v.string("A title is required"), v.nonEmpty("A title is required")),
  content: v.pipe(v.string("Content is required"), v.nonEmpty("Content is required")),
  description: v.nullable(v.string()),
  coverImage: v.pipe(
    v.file("Please select an image file."),
    v.mimeType(["image/jpeg", "image/png"], "Please select a JPEG or PNG file."),
    v.maxSize(1024 * 1024 * 2, "Please select a file smaller than 2 MB.")
  )
})
export const EditArticleSchema = v.object({
  ...ArticleSchema.entries,
  coverImage: v.optional(ArticleSchema.entries.coverImage)
})
