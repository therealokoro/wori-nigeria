export default defineEventHandler(async () => {
  const auth = serverAuth()
  const config = useRuntimeConfig()
  const kvKey = "admin:info"
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
  }

  return { admin }
})
