import { createSuperAdmin } from "../../services/admin"

export default defineEventHandler(async () => {
  const admin = await createSuperAdmin()
  return { admin }
})
