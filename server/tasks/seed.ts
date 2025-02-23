export default defineTask({
  meta: {
    name: "db:seed",
    description: "Run database seed task"
  },
  async run() {
    console.log("Running DB seed task...")
    const auth = serverAuth()
    const config = useRuntimeConfig()

    try {
      const res = await auth.api.signUpEmail({
        body: {
          name: config.public.adminAuthName,
          email: config.public.adminAuthEmail,
          password: config.public.adminAuthPassword
        }
      })

      console.log(`Admin created with email: ${res.user.email}`)

      return { result: "success" }
    }
    catch (error) {
      console.log(error)
      return { result: "failure" }
    }
  }
})
