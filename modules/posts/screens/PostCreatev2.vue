<template>
  <div class="w-full h-full max-w-screen-md mx-auto flex flex-col">
    <div class="card-post">
      <div class="px-8">
        <FileUpload 
          v-if="!form.coverImage && !form.coverImageUrl"
          mode="basic" 
          name="demo[]" 
          url="/api/upload" 
          accept="image/png, image/jpeg" 
          :maxFileSize="2e+6" 
          @upload="onUpload"
          :auto="true"
          chooseLabel="Imagem de capa"
        />
        <div v-else class="flex items-center w-full gap-10">
          <img :src="((form.coverImage as any)?.objectURL || (form.coverImageUrl + '?c='))" alt="Imagem de capa do post" class="rounded-md w-24 h-24 object-contain" />
          <div>
            <Button 
              label="Remover"
              icon="pi pi-trash"
              severity="danger"
              icon-pos="right"
              outlined
              size="small"
              @click="removeFile"
            />
          </div>
        </div>
      </div>
      <div class="w-full flex flex-col gap-6">
        <Textarea 
          v-model="form.title"
          autoResize
          rows="2"
          cols="10" 
          placeholder="Insira o titulo aqui"
          class="title-post"
        />
      </div>
      <div class="bg-neutral-100 w-full h-20 flex items-center gap-2 px-8 mb-2 mt-6 py-2">
        <Button label="H1" severity="secondary" text class="text-xl text-neutral-900" @click="setHeading(1)" />
        <Button label="H2" severity="secondary" text class="text-xl text-neutral-900" @click="setHeading(2)" />
        <Button label="H3" severity="secondary" text class="text-xl text-neutral-900" @click="setHeading(3)" />
        <Button label="B" severity="secondary" text class="text-xl text-neutral-900" @click="setBold" />
        <Button label="I" severity="secondary" text class="text-xl text-neutral-900" @click="setItalic" />
        <Button severity="secondary" text class="text-xl text-neutral-900" icon="pi pi-link" @click="setLink" />
        <Button severity="secondary" text class="text-xl text-neutral-900" icon="pi pi-list" @click="setList" />
        <Button severity="secondary" text class="text-xl text-neutral-900" icon="pi pi-code" @click="setCode" />
      </div>
      <TiptapEditor ref="tiptapRef" v-model="form.description" :readonly="false"></TiptapEditor>
    </div>
    <div class="flex gap-4 w-full justify-between">
      <Button 
        label="Salvar"
        icon="pi pi-plus"
        icon-pos="left"
        :loading="loading"
        @click="create"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FileUploadUploadEvent } from 'primevue/fileupload'

import { usePostCreate } from '@/modules/posts/composables/usePostCreate/usePostCreate'

const { create, form, loading } = usePostCreate()

const tiptapRef = ref()

const removeFile = () => {
  form.coverImage = null
  form.coverImageUrl = null
}

const onUpload = async (event: FileUploadUploadEvent) => {
  const fileFm = Array.isArray(event.files) ? event.files[0] : event.files
  form.coverImage = fileFm
}

const setHeading = (level: number) => {
  tiptapRef.value.editor?.chain().focus().toggleHeading({ level }).run()
}

const setBold = () => {
  tiptapRef.value.editor?.chain().focus().setBold().run()
}

const setItalic = () => {
  tiptapRef.value.editor?.chain().focus().setItalic().run()
}

const setLink = () => {
  const previousUrl = tiptapRef.value.editor.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)
  
  if (url === null) return
      
  if (url === '') {
    tiptapRef.value.editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .unsetLink()
      .run()

    return
  }

  tiptapRef.value.editor
    .chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href: url })
    .run()
}

const setList = () => {
  tiptapRef.value.editor?.chain().focus().toggleBulletList().run()
}

const setCode = () => {
  tiptapRef.value.editor?.chain().focus().toggleCodeBlock().run()
}

useSeoMeta({
  title: 'Criar post',
  ogTitle: 'Criar post',
  description: 'Crie seu post para outras pessoas verem',
  ogDescription: 'Crie seu post para outras pessoas verem',
})
</script>

<style scoped lang="scss">

.card-post {
  @apply w-full h-full bg-white flex flex-col gap-6 rounded-md mb-4 overflow-y-auto py-8;
  
  &.readonly {
    @apply gap-0 p-0;

    .title-post {
      @apply pt-8 px-2 md:px-14;
    }
  }

  .title-post {
    @apply px-8 w-full font-bold text-3xl md:text-5xl text-neutral-900 border-none outline-none rounded-md
    focus:ring-0;
  }
}
</style>