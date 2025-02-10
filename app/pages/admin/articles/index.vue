<script lang="ts" setup></script>

<template>
  <Page
    admin
    title="Articles"
  >
    <div>
      <ui-button
        to="/admin/articles/create"
        icon="lucide:plus"
        text="Create Article"
      />
    </div>

    <!-- <ArticlesListGrid
      :pagination="false"
      admin
    /> -->
  </Page>
</template>
