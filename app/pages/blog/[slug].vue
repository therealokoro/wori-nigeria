<script lang="ts" setup>
const article = {
  title: "WORI Meets with the less privilaged",
  coverImage: "/news-4.jpg",
  description: "A meeting was held by the executives of WORI with the less privilaged to foster stronger relationships and ties",
  createdAt: "Published on 24th April 2025",
  link: "/blog/rtwqygb-dqyu"
}
</script>

<template>
  <Page title="Blog">
    <PageSection
      :title-left="article.title"
      :description="article.description"
      :meta="article.createdAt"
    >
      <div
        w="full"
        grid="~ cols-1 lg:cols-3 gap-7"
      >
        <!-- Main -->
        <article class="col-span-1 lg:col-span-2">
          <div class="md:h-150 mb-10">
            <NuxtImg
              :src="article.coverImage"
              image="cover"
            />
          </div>

          <ui-text>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam quas quisquam dolore eaque, aliquid blanditiis qui facere voluptate quos architecto voluptas sunt ratione, corporis maxime id voluptates doloribus et molestias. Velit itaque porro laboriosam accusamus! Natus suscipit magni dignissimos, repellat dolorem veritatis et cumque in corrupti dolore? Placeat ipsa rerum, ex fuga sed, at corporis quaerat eum illo aut enim blanditiis, quos magni aspernatur culpa adipisci? Aliquam recusandae accusantium animi nesciunt rerum. Architecto magnam reprehenderit aliquid eos quod. Delectus, voluptates libero. Error quos nobis libero laborum possimus delectus impedit nostrum consequatur, doloribus ipsum. Laborum distinctio nemo beatae? Incidunt nobis aperiam ipsam provident molestiae vero inventore, nemo reiciendis quas dolor nihil facilis illo et consequuntur autem officiis ullam ab est laudantium quo fugiat aspernatur placeat eius. Et esse architecto ipsam beatae, quod ex tenetur repellat natus! Assumenda molestiae unde perspiciatis molestias nesciunt sint quisquam exercitationem veritatis ipsum libero, vitae corrupti officia, in cupiditate veniam esse? Sapiente, esse animi? Corporis, a quaerat modi laborum iure perspiciatis ab provident, aspernatur possimus aut totam consectetur ipsam architecto molestias dolorum! Doloremque minima expedita alias, facere ipsum nemo consequuntur dolore obcaecati debitis sit iusto, quod esse est maxime consequatur natus itaque iste reprehenderit, distinctio assumenda pariatur!
          </ui-text>
        </article>

        <!-- Aside -->
        <aside class="col-span-1 space-y-7">
          <ui-text
            type="subtitle"
            mb="5"
          >
            More Articles
          </ui-text>
          <ArticlesCard
            v-for="i in 2"
            :di="i"
            :article
          />
        </aside>
      </div>
    </PageSection>
  </Page>
</template>
