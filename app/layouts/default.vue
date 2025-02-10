<template>
  <div
    class="relative min-h-screen flex flex-col"
    overflow-x="hidden"
  >
    <PageHeader />

    <div class="w-full">
      <slot />
    </div>

    <PageFooter />
  </div>
</template>
