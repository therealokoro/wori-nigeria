export const formatDate = (
  date: string | Date,
  suffix = "Published, "
): string => {
  const parsedDate = new Date(date)
  if (isNaN(parsedDate.getTime())) {
    return "Invalid Date"
  }
  return (
    suffix
    + parsedDate.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  )
}

export function objectToFormData(obj: Record<string, any>) {
  const formData = new FormData()
  Object.keys(obj).forEach((key) => {
    formData.append(key, obj[key])
  })
  return formData
}
