import { consola } from "consola"
import { serverAuth } from "../utils/auth"

export const createSuperAdmin = async () => {
  const auth = serverAuth()
  const config = useRuntimeConfig()
  const kvKey = "admin:info"

  consola.log("Checking for superadmin account....")
  let admin: any = await hubKV().get(kvKey)

  if (!admin) {
    const res = await auth.api.signUpEmail({
      body: {
        name: config.public.adminAuthName,
        email: config.public.adminAuthEmail,
        password: config.public.adminAuthPassword
      }
    })

    hubKV().set(kvKey, res.user)
    admin = res.user

    consola.log("Suepradmin created successfully")
  }

  return admin
}
