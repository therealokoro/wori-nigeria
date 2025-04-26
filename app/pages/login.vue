<script lang="ts" setup>
import * as v from "valibot"
import type { FormBuilder } from "~/components/Ui/FormBuilder.vue"

definePageMeta({ layout: "empty" })
useSeoMeta({ title: "Admin Login" })

const formFields: FormBuilder[] = [
  {
    variant: "Input",
    label: "Email Address",
    placeholder: "Enter your email address here",
    name: "email",
    type: "email"
  },
  {
    variant: "Input",
    label: "Password",
    placeholder: "Enter your password here",
    name: "password",
    type: "password"
  }
]

const formSchema = v.object({
  password: v.pipe(v.string(), v.nonEmpty("Password is required")),
  email: v.pipe(
    v.string("Email is required"),
    v.email("Enter a valid email"),
    v.nonEmpty("Email is required")
  )
})

const form = useForm({ validationSchema: toTypedSchema(formSchema) })
const handleSubmit = form.handleSubmit(async ({ email, password }) => {
  const toast = $toast.promise("Checking your credentials, please wait!...")
  const { signIn } = useAuth()
  const { error } = await signIn.email({ email, password, callbackURL: "/admin" })
  if (error) return toast.error(error)
})
</script>

<template>
  <div class="f-container h-screen">
    <div class="h-full flex-center flex-col gap-2">
      <divLogo />
      <UiCard class="md:w-90 border-0 shadow-none">
        <template #content>
          <div class="text-center mb-7">
            <ui-text type="title">Welcome Back</ui-text>
            <ui-text type="small">Enter your account credentials to continue</ui-text>
          </div>

          <form @submit="handleSubmit">
            <fieldset class="grid gap-6">
              <UiFormBuilder :fields="formFields" />
              <UiButton
                class="w-full"
                type="submit"
              >
                Continue to Account
              </UiButton>
            </fieldset>
          </form>
        </template>
      </UiCard>
    </div>

    <LazyUiNotivue />
  </div>
</template>
