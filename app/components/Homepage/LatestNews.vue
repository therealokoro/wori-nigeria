<script lang="ts" setup>
const articles = [{
  title: "WORI Meets with the less privilaged",
  coverImage: "/news-1.jpg",
  description: "A meeting was held by the executives of WORI with the less privilaged to foster stronger relationships and ties",
  createdAt: "24th April 2025",
  link: "/blog#"
}, {
  title: "WORI Meets with the less privilaged",
  coverImage: "/news-2.jpg",
  description: "A meeting was held by the executives of WORI with the less privilaged to foster stronger relationships and ties",
  createdAt: "24th April 2025",
  link: "/blog#"
}, {
  title: "WORI Meets with the less privilaged",
  coverImage: "/news-3.jpg",
  description: "A meeting was held by the executives of WORI with the less privilaged to foster stronger relationships and ties",
  createdAt: "24th April 2025",
  link: "/blog#"
}]
</script>

<template>
  <PageSection title="Latest Article">
    <ArticlesListGrid :articles />
  </PageSection>
</template>
