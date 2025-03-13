<script lang="ts" setup>
import { UpdateMessageSchema } from "~~/shared/schemas"

const id = useRoute().params.id?.toString()
const { data } = await useAsyncData(`msg-${id}`, () => $fetch(`/api/messages/single?id=${id}`))

const message = computed(() => ({
  ...data.value!,
  name: `${data.value!.lastname} ${data.value!.firstname}`,
  date: formatDate(data.value!.createdAt, "")
}))

const form = useForm({
  validationSchema: toTypedSchema(UpdateMessageSchema),
  initialValues: { id, isRead: false }
})

const replyMessage = form.handleSubmit(async (body) => {
  console.log(body)
  const toast = $toast.load("Repling message, please wait...")
  try {
    await $fetch("/api/messages/update", { method: "PUT", body })
    toast.success("Your reply was sent successfully")
  }
  catch (error: any) {
    toast.error(error.data.message)
  }
})

async function deleteMessage() {
  const toast = $toast.load("Deleting message, please wait...")
  try {
    await $fetch(`/api/messages/delete?id=${id}`, { method: "DELETE" })
    toast.success("Message deleted successfully")
    navigateTo("/admin/contacts")
  }
  catch (error: any) {
    toast.success(error.data.message)
  }
}

onMounted(() => {
  $fetch("/api/messages/update", { method: "PUT", body: { isRead: true, id } })
})
</script>

<template>
  <Page
    admin
    spacing=""
    title="Messages"
  >
    <div class="w-full h-90vh relative flex flex-col">
      <div class="flex-shrink h-max border-b p-3 flex-horizontal">
        <div class="flex gap-3">
          <UiAvatar fallback="OR" />
          <div>
            <ui-text class="font-bold">
              {{ message.name }}
            </ui-text>
            <ui-text type="small">{{ message.email }}</ui-text>
            <ui-text type="caption">{{ message.date }}</ui-text>
          </div>
        </div>
        <UiConfirmDialog
          message="Are you sure you want to delete this message"
          @confirm="deleteMessage"
        >
          <ui-button
            size="sm"
            icon="lucide:trash"
            text="Delete Message"
            variant="destructive"
          />
        </UiConfirmDialog>
      </div>
      <UiScrollArea class="flex-1 p-5">
        <div class="text-left">
          <ui-text>{{ message.body }}</ui-text>
        </div>

        <UiSeparator
          text="Replies"
          my="10"
        />

        <div class="text-right">
          <ui-text>{{ message.response }}</ui-text>
        </div>
      </UiScrollArea>
      <form @submit="replyMessage">
        <div class="w-full p-2 space-y-2 bg-muted">
          <UiVeeTextarea
            placeholder="Enter your reply message here..."
            name="response"
            required
          />
          <ui-button
            class="float-end"
            type="submit"
            text="Send Message"
          />
        </div>
      </form>
    </div>
  </Page>
</template>
