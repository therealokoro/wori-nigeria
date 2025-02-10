<script lang="ts" setup>
  const [contact1, contact2] = useAppConfig().info.contacts
  const { y } = useWindowScroll()
</script>

<template>
  <header
    flex="~ col"
    transition="~ all ease-in-out"
    :class="{ 'bg-white shadow': y >=10 }"
    class="fixed top-0 left-0 w-full h-$header-height z-10"
  >
    <!-- Top Bar -->
    <div
      hidden
      md="block"
      bg="primary"
      text="primary-foreground"
    >
      <div class="f-container py-1 text-right">
        <ui-text type="small">
          <span>Contact Us On: </span>
          <span class="inline-block space-y-3">
            <a
              hover="underline"
              :href="`tel:${contact1}`"
            >{{ contact1 }}</a>
            Or
            <a
              hover="underline"
              :href="`tel:${contact2}`"
            >{{ contact2 }}</a>
          </span>
        </ui-text>
      </div>
    </div>

    <!-- Header Content -->
    <UiContainer class="h-full flex-horizontal">
      <!-- Logo -->
      <PageLogo />

      <!-- Navigation -->
      <PageNavigation />
    </UiContainer>
  </header>
</template>
