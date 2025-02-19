<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/valibot"
import type { FormBuilder } from "../Ui/FormBuilder.vue"
import { ArticleSchema, EditArticleSchema } from "#shared/schemas"
import type { IArticle } from "~~/shared/types"

const { action, article } = defineProps<{
  action: ArticleSubmitActions
  article?: IArticle
}>()

const formFields: FormBuilder[] = [
  {
    name: "title",
    label: "Title",
    placeholder: "Enter the article title here",
    variant: "Input"
  },

  {
    name: "description",
    label: "Description",
    placeholder: "Enter the article description here",
    variant: "Input"
  },

  {
    name: "coverImage",
    label: "Cover Image",
    placeholder: "Select a cover image for the article",
    hint: "Image files no more than 2mb",
    variant: "FileInput"
  }
]

const initialValues = computed(() => {
  return article
  ? {
      title: article.title,
      content: article.content,
      description: article.description
    }
  : {}
})

const Schema = action == "create" ? ArticleSchema : EditArticleSchema

const form = useForm({
  validationSchema: toTypedSchema(Schema),
  initialValues: { ...initialValues.value }
})

const onSubmitArticle = form.handleSubmit(async v => await useSubmitArticle(v, action, article?.id))
</script>

<template>
  <form @submit="onSubmitArticle">
    <div space-y="5">
      <ui-button
        type="submit"
        text="Publish Article"
      />
      <UiFormBuilder :fields="formFields" />
      <ArticlesEditor name="content" />
    </div>
  </form>
</template>
