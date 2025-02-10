<script lang="ts" setup>
  defineProps<{ dark?: boolean }>()
</script>

<template>
  <nuxt-link
    to="/"
    p="2"
    flex="~ items-center gap-2"
    rounded="$radius"
    focus-within="highlight"
  >
    <NuxtImg
      src="/wori-icon.svg"
      alt="WORI Logo"
      width="50px"
    />
    <p
      class="uppercase font-black text-.9rem leading-4"
      :class="dark ? 'text-secondary-foreground' : 'text-foreground'"
    >
      <span>Women Rights</span>
      <br>
      <span>Initiative</span>
    </p>
  </nuxt-link>
</template>
