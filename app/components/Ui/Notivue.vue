<script lang="ts" setup>
  import { Notivue } from "notivue"

  onMounted(() => {
    const config = useNotivue()
    config.update({
      position: "top-center",
      enqueue: true,
      pauseOnHover: true,
      pauseOnTabChange: true,
      teleportTo: "body"
    })
  })
</script>

<template>
  <Notivue v-slot="item">
    <div
      role="alert"
      :data-notivue="item.type"
      :id="item.id"
      min-w="300px"
      flex="horizontal"
      bg="background"
      rounded="$radius"
      shadow="md"
      border
      p="3"
    >
      <div flex="~ gap-2" items="center">
        <div class="icon" />

        <p text="sm foreground" font="semibold">{{ item.message }}</p>
        <span class="sr-only">{{ item.type }}</span>
      </div>

      <button
        size="5"
        flex="center"
        rounded="$radius"
        bg="transparent hover:muted"
        m="l7"
        focus-accent-outline
        @click="item.clear()"
      >
        <div class="i-tabler-x" />
      </button>
    </div>
  </Notivue>
</template>

<style scoped>
  [data-notivue="success"] .icon,
  [data-notivue="promise-resolve"] .icon {
    --uno: "c-green i-mingcute-check-circle-fill";
  }

  [data-notivue="error"] .icon,
  [data-notivue="promise-reject"] .icon {
    --uno: "c-red i-mingcute-close-circle-fill";
  }

  [data-notivue="warning"] .icon {
    --uno: "c-orange i-mingcute-warning-fill";
  }

  [data-notivue="info"] .icon {
    --uno: "c-blue i-mingcute-information-fill";
  }

  [data-notivue="promise"] .icon {
    --uno: "c-foreground i-mingcute-loading-line animate-spin";
  }
</style>
