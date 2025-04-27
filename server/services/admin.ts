import { consola } from "consola"
import { serverAuth } from "../utils/auth"

export const createSuperAdmin = async () => {
  const auth = serverAuth()
  const config = useRuntimeConfig()
  let admin: any = null

  try {
    consola.log("Checking for superadmin account....")

    const res = await auth.api.signUpEmail({
      body: {
        name: config.public.adminAuthName,
        email: config.public.adminAuthEmail,
        password: config.public.adminAuthPassword
      }
    })

    admin = res.user
    consola.log("Suepradmin created successfully")
    return admin
  }
  catch (e: any) {
    consola.log(e)
    return "Admin already exists!!!"
  }
}
