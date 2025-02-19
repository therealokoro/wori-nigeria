<script lang="ts" setup>
const sponsors1 = [
  { type: "lg", image: "/logos/care-logo.jpg", alt: "Care" },
  { type: "lg", image: "/logos/kesca.png", alt: "KESCA" },
  { type: "lg", image: "/logos/kebbi-gov.png", alt: "Kebbi State Government" },
  { type: "lg", image: "/logos/usaid-logo.png", alt: "USAID" },
  { type: "lg", image: "/logos/coat-of-arm.png", alt: "The Nigerian Government" },
  { type: "lg", image: "/logos/wrapa-logo.png", alt: "WRAPA" }
]
const sponsors2 = [
  { type: "sm", image: "/logos/leprosy-mission-logo.png", alt: "The Leprosy Mission" },
  { type: "sm", image: "/logos/engender-logo.png", alt: "Engender Health" },
  { type: "sm", image: "/logos/gain-logo.png", alt: "Gain" },
  { type: "sm", image: "/logos/helpline-logo.png", alt: "Helpline Abuja" },
  { type: "sm", image: "/logos/toto-logo.jpg", alt: "Toto Center Initiative" }
]
</script>

<template>
  <PageSection>
    <div
      flex="~ col center gap-4"
      class="text-center"
    >
      <ui-text type="title">Our Sponsors and Partners</ui-text>
      <ui-text>
        We are backed by some of the biggest names in and around nigeria and africa at large
      </ui-text>
    </div>

    <div
      m="x-auto t-10"
      class="w-full max-w-screen-md"
      flex="~ wrap center gap-7"
    >
      <NuxtMarquee
        gradient
        gradient-width="100px"
      >
        <div
          v-for="i in sponsors1"
          class="mx-7 w-50px md:w-70px"
        >
          <NuxtImg
            class="object-contain w-full h-full"
            format="webp"
            :alt="i.alt"
            :src="i.image"
          />
        </div>
      </NuxtMarquee>
      <NuxtMarquee
        gradient
        direction="right"
        gradient-width="100px"
      >
        <div
          v-for="i in sponsors2"
          class="w-100px mx-7"
        >
          <NuxtImg
            class="object-contain w-full h-full"
            format="webp"
            :alt="i.alt"
            :src="i.image"
          />
        </div>
      </NuxtMarquee>
    </div>
  </PageSection>
</template>
