<script lang="ts" setup>
const team = [
  { name: "Dr. Amb. Laiatu Augustine Bamaiyi", post: "Founder & CEO", img: "/dr-laiatu.jpg" },
  { name: "Mr. Solomon Liman Ahore", post: "Chairman Board Member", img: "mr-solomon.jpg" }
]
</script>

<template>
  <Page
    title="Meet the Team"
    description="Read all about WORI, how it was formed and much more"
  >
    <PageSection>
      <ui-text
        type="heading"
        class="text-center font-extrabold mb-10"
      >
        About WORI - Meet The Team
      </ui-text>

      <div class="w-full flex-center flex-col md:flex-row flex-wrap gap-y-17 gap-10 py-5">
        <div
          v-for="i in team"
          w="270px md:350px"
          h="300px md:400px"
          class="relative"
        >
          <NuxtImg
            :src="i.img"
            :alt="i.name"
            image="cover"
            rounded="2xl md:3xl"
          />
          <div
            class="absolute inset-x-2 -bottom-10 py-5 bg-white shadow-lg"
            flex="~ center col gap-1"
            rounded="2xl md:3xl"
          >
            <p class="text-sm md:text-base font-extrabold">{{ i.name }}</p>
            <p class="text-xs md:text-sm font-medium">{{ i.post }}</p>
          </div>
        </div>
      </div>
    </PageSection>
  </Page>
</template>
