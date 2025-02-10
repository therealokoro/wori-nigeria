<template>
  <UiContainer
    relative
    md="h-80vh"
    max-h="sm:700px"
    flex="~ col gap-10 center"
    overflow="hidden"
  >
    <div
      max-w="150"
      text="center"
      flex="1 ~ col center"
      space-y="7"
      py="20 md:0"
    >
      <ui-text type="headline">
        <span>Championing Women's Rights, </span>
        <span
          text="primary hover:white"
          class="fancy-undeline"
        >
          Transforming Lives
        </span>
      </ui-text>

      <ui-text>
        Empowering women, promoting gender equality, and advocating for social
        justice, we envision a future where women's rights are respected,
        protected, and recognized, and their voices are valued and heard.
      </ui-text>

      <div
        w="max"
        flex="center gap-2"
      >
        <ui-button
          to="/about/overview"
          variant="default"
          text="Learn More"
          size="lg"
          effect="hover"
        />
      </div>
    </div>
  </UiContainer>

  <!-- Overlay Background -->
  <div
    class="absolute top-0 left-0 z-[-2] size-screen rotate-180 bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"
  >
    <div
      class="absolute size-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"
    />
  </div>
</template>

<style lang="css" scoped>
  .fancy-undeline {
    background-image: linear-gradient(120deg, #ec008c, #fc6767 100%);
    background-repeat: no-repeat;
    background-size: 100% 0.1em;
    background-position: 0 100%;
    transition: all 0.25s ease-in;
  }

  .fancy-undeline:hover {
    background-size: 100% 88% !important;
  }
</style>
