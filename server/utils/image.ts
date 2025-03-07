export async function uploadImage(image: File, id: string, prefix: string) {
  // validate and upload the image to server
  ensureBlob(image, { maxSize: "1MB", types: ["image"] })
  return await hubBlob().put(image.name, image, { prefix, addRandomSuffix: true })
}
