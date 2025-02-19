<script lang="ts" setup></script>

<template>
  <Page
    title="Articles"
    admin
  >
    <div>
      <ui-button
        to="/admin/articles/create"
        icon="lucide:plus"
        text="Create Article"
      />
    </div>

    <ArticlesListGrid admin />
  </Page>
</template>
