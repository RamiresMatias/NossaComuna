<template>
  <ClientOnly>
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
        chooseLabel="Add Imagem de capa"
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
    <Textarea 
      v-model="form.title" 
      auto-resize
      rows="2" 
      cols="30" 
      placeholder="Insira o titulo aqui"
      class="title-post"
    />
    <div class="bg-neutral-100 w-full h-20 flex items-center gap-2 px-8 mb-2 mt-6">
      <Button label="H" severity="secondary" text class="text-xl text-neutral-900" />
      <Button label="B" severity="secondary" text class="text-xl text-neutral-900" />
      <Button label="I" severity="secondary" text class="text-xl text-neutral-900" />
      <Button severity="secondary" text class="text-xl text-neutral-900" icon="pi pi-link" />
      <Button severity="secondary" text class="text-xl text-neutral-900" icon="pi pi-list" />
      <Button severity="secondary" text class="text-xl text-neutral-900" icon="pi pi-list" />
      <Button severity="secondary" text class="text-xl text-neutral-900" icon="pi pi-code" />
    </div>
    <EditorContent :editor="editor" class="h-full" />
  </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import {StarterKit} from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'

import type { FileUploadUploadEvent } from 'primevue/fileupload'


const editor = useEditor({
  extensions: [
    StarterKit,
    Link,
    Placeholder.configure({
      placeholder: 'Digite o conteúdo do seu post aqui...',
      emptyEditorClass: 'editor-empty',
    })
  ],
  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none',
    },
  },
})

import { usePostCreate } from '@/modules/posts/composables/usePostCreate/usePostCreate'

const { create, form, loading } = usePostCreate()

const preview = ref(false)

const removeFile = () => {
  form.coverImage = null
  form.coverImageUrl = null
}

const onUpload = async (event: FileUploadUploadEvent) => {
  const fileFm = Array.isArray(event.files) ? event.files[0] : event.files
  form.coverImage = fileFm
}

useSeoMeta({
  title: 'Criar post',
  ogTitle: 'Criar post',
  description: 'Crie seu post para outras pessoas verem',
  ogDescription: 'Crie seu post para outras pessoas verem',
})
</script>
<style lang="scss">
.tiptap p.is-empty:first-child::before {
  content: attr(data-placeholder);
  
  @apply text-gray-400 text-lg;
}

.card-post {
  height: calc(100vh - 180px);

  @apply w-full h-full bg-white flex flex-col gap-6 rounded-md mb-4 overflow-y-auto box-border relative py-8;
  
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

.ProseMirror {
  @apply bg-white text-neutral-900 p-3 text-lg px-8;
}

.tiptap {
  :first-child {
    margin-top: 0;
  }

  /* List styles */
  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;
    list-style: disc;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-top: 1rem;
    text-wrap: pretty;
    font-weight: 700;
  }

  h1 {
    @apply text-4xl;
  }

  h2 {
    @apply text-2xl;
  }

  h3 {
    @apply text-xl;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

  /* Code and preformatted text styles */
  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
    border-radius: 0.4rem;
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: black;
    border-radius: 0.5rem;
    color: white;
    font-family: 'JetBrainsMono', monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid gray;
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid var(--gray-2);
    margin: 2rem 0;
  }
}
</style>