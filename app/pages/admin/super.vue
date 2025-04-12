<script lang="ts" setup>
definePageMeta({ layout: "empty", auth: false })

async function handleSubmit() {
  const toast = $toast.promise("Creating admin, please wait!...")
  const { signUp } = useAuth()
  const { error } = await signUp.email({
    name: "Super Admin",
    email: "admin@wori.org",
    password: "admin-123"
  })
  if (error) toast.error(error)
  else { toast.success("Admin created successfully") }
}
</script>

<template>
  <Page
    contain
    title="Create Admin"
    class="pt-0 h-screen"
  >
    <div class="w-full h-full flex-center flex-col gap-2">
      <ui-button @click="handleSubmit()">Create Admin</ui-button>
    </div>

    <LazyUiNotivue />
  </Page>
</template>
