<script lang="ts" setup>
  const { data } = await useAsyncData("messages", () => $fetch("/api/messages/all"))
  const renderList = computed(() => {
    return data.value.messages.map(c => ({
      ...c,
      name: `${c.lastname} ${c.firstname}`,
      date: formatDate(c.createdAt, "")
    }))
  })
</script>

<template>
  <div class="overflow-x-auto">
    <UiTable>
      <UiTableHeader>
        <UiTableRow>
          <UiTableHead class=" font-semibold text-foreground">Name</UiTableHead>
          <UiTableHead class="hidden  font-semibold text-foreground md:table-cell">
            Email
          </UiTableHead>
          <UiTableHead class=" font-semibold text-foreground">Date</UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody>
        <template
          v-for="item in renderList"
          :key="item.id"
        >
          <UiTableRow
            class="cursor-pointer"
            :class="!item.isRead ? '!font-extrabold' : ''"
            @click="navigateTo(`/admin/contacts/${item.id}`)"
          >
            <UiTableCell>
              <div class="flex flex-col gap-2">
                <p>{{ item.name }}</p>
                <p class="text-muted-foreground md:hidden">{{ item.email }}</p>
              </div>
            </UiTableCell>
            <UiTableCell class="hidden text-muted-foreground md:table-cell">
              {{ item.email }}
            </UiTableCell>
            <UiTableCell class=" text-muted-foreground">{{ item.date }}</UiTableCell>
          </UiTableRow>
        </template>
      </UiTableBody>
    </UiTable>
  </div>
</template>
