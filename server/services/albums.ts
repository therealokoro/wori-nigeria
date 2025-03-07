import { typeid } from "typeid-js"
import { Albums } from "~~/server/database/models"

type Query = {
  slug?: string
  id?: string
}

export async function fetchAlbum({ slug, id }: Query) {
  return await useDb().query.Albums.findFirst({
    where: slug ? eq(Albums.slug, slug) : id ? eq(Albums.id, id) : undefined
  })
}

export async function uploadAlbumImages(images: File[]) {
  const imgUrls: string[] = []
  for (const img of images) {
    const id = typeid().toString()
    const blob = await uploadImage(img, id, "gallery")
    imgUrls.push(blob.pathname)
  }
  return imgUrls
}
