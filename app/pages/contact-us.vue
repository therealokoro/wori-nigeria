<script lang="ts" setup>
const { contacts, email, socialLinks } = useAppConfig().info
</script>

<template>
  <Page
    title="Contact Us"
    contain
  >
    <div
      w="full"
      py="10"
      flex="~ col wrap gap-7 md:(row gap-10)"
    >
      <div
        space="y-3"
        w="full md:xl"
        flex="~ center col"
        text=""
      >
        <ui-text type="headline">
          We'd love to here from you today
        </ui-text>
        <ui-text>
          Send us a message via e-mail and we'll try our possible best to respond to you as quick as possible
        </ui-text>

        <div
          w="full"
          space-y="4"
        >
          <!-- Address -->
          <div class="list">
            <UiIcon name="mingcute:location-3-line" />
            <ui-text type="small">
              No. 4 Olusegun Obasanjo Road, Aleiro Quarters, Birnin Kebbi, Kebbi State
            </ui-text>
          </div>

          <!-- Phone Numbers -->
          <div class="list">
            <UiIcon name="mingcute:phone-call-line" />
            <ui-text type="small">
              <a :href="`tel:${contacts[0]}`">{{ contacts[0] }}</a>,
              &nbsp;<a :href="`tel:${contacts[1]}`">{{ contacts[1] }}</a>,
              &nbsp;<a :href="`tel:${contacts[2]}`">{{ contacts[2] }}</a>
            </ui-text>
          </div>

          <!-- Email -->
          <div class="list">
            <UiIcon name="mingcute:mail-send-line" />
            <ui-text type="small">
              <a :href="`mailto:${email}`">{{ email }}</a>
            </ui-text>
          </div>

          <!-- Social Links -->
          <div class="list">
            <nuxt-link
              v-for="i in socialLinks"
              :to="i.link"
              class="text-secondary-foreground"
            >
              <UiIcon
                :name="i.icon"
                :aria-label="i.label"
              />
            </nuxt-link>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="flex-1">
        <UiCard content-class="sm:p-10">
          <template #content>
            <form class="">
              <fieldset class="grid gap-6">
                <UiVeeInput
                  label="First name"
                  placeholder="Enter your firstname here"
                  name="firstname"
                  required
                />
                <UiVeeInput
                  label="Last name"
                  placeholder="Enter your lastname here"
                  name="lastname"
                  required
                />
                <UiVeeInput
                  label="Email"
                  placeholder="Enter your email address here"
                  type="email"
                  name="email"
                  required
                />
                <UiVeeInput
                  label="Phone"
                  placeholder="Enter your phone number here"
                  type="tel"
                  name="phone"
                />
                <UiVeeTextarea
                  :rows="7"
                  label="Message"
                  placeholder="Leave us a message here..."
                  name="message"
                  required
                />
                <UiButton
                  size="lg"
                  class="w-full"
                  type="submit"
                >
                  Send message
                </UiButton>
              </fieldset>
            </form>
          </template>
        </UiCard>
      </div>
    </div>
  </Page>
</template>

<style lang="css" scoped>
.list{
  --uno: 'w-full flex items-center gap-3';
}

.list a{
  --uno: 'hover:underline text-primary'
}
</style>
