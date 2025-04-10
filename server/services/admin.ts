import { consola } from "consola"
import { serverAuth } from "../utils/auth"

export const createSuperAdmin = async () => {
  const auth = serverAuth()
  const config = useRuntimeConfig()
  let admin: any = null
  // const kvKey = "admin:info"

  try {
    consola.log("Checking for superadmin account....")
    // let admin: any = await hubKV().get(kvKey)

    // if (!admin) {
    const res = await auth.api.signUpEmail({
      body: {
        name: config.public.adminAuthName,
        email: config.public.adminAuthEmail,
        password: config.public.adminAuthPassword
      }
    })

    // hubKV().set(kvKey, res.user)
    admin = res.user

    consola.log("Suepradmin created successfully")
    // }
    return admin
  }
  catch (e: any) {
    consola.log(e)
    return "Admin already exists!!!"
  }
}
