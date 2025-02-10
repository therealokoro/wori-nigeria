<script lang="ts" setup>
  const countUpStats = [
    {
      label: "Women and Children Reached",
      value: "200",
      icon: "ion:woman-outline"
    },
    {
      label: "Homes and Villages Visited",
      value: "200",
      icon: "mingcute:home-3-line"
    },
    {
      label: "Lives Touched",
      value: "200",
      icon: "mingcute:hand-heart-line"
    }
  ]
</script>

<template>
  <PageSection
    bg="primary/10"
    title="Our Impact in Numbers"
  >
    <div
      w="full"
      grid="~ cols-1 md:cols-3 gap-10"
    >
      <div
        v-for="item in countUpStats"
        flex="~ col center gap-3"
      >
        <div
          size="20 md:25"
          flex="center"
          rounded="full"
          text="foreground"
          border="3 foreground"
        >
          <Icon
            text="2xl md:4xl"
            :name="item.icon"
          />
        </div>
        <div text="center">
          <ui-text type="title">
            {{ item.value }}
          </ui-text>
          <ui-text font="bold">
            {{ item.label }}
          </ui-text>
        </div>
      </div>
    </div>
  </PageSection>
</template>
