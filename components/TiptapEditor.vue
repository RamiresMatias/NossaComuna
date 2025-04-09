<template>
  <ClientOnly> 
    <EditorContent :editor="editor" v-model="modelValue" class="h-full" :class="{'readonly': readonly}" />
  </ClientOnly>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import {StarterKit} from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'

const modelValue = defineModel<string | null>()

const emit = defineEmits<{
  (e: 'update:modelValue', description: string): void
  (e: 'onBeforeCreate'): void
  (e: 'onCreate'): void
}>()

const props = withDefaults(
  defineProps<{
    readonly?: boolean
  }>(),
  {
    readonly: false
  }
)

const editor = useEditor({
  extensions: [
    StarterKit,
    Link,
    Placeholder.configure({
      placeholder: 'Digite o conteúdo do seu post aqui...',
      emptyEditorClass: 'editor-empty',
    })
  ],
  content: modelValue.value,
  editable: !props.readonly,
  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none',
    },
  },
  onUpdate: ({editor}) => {
    emit('update:modelValue', editor.getHTML())
  },
  onBeforeCreate () {
    emit('onBeforeCreate')
  },
  onCreate () {
    emit('onCreate')
  }
})


onUnmounted(() => {
  editor.value.destroy()
})

defineExpose({
  editor
})
</script>
<style lang="scss">

.tiptap p.is-empty:first-child::before {
  content: attr(data-placeholder);
  
  @apply text-gray-400 text-lg;
}

.ProseMirror {
  @apply bg-white text-neutral-900 text-xl p-3 px-8;
}

.readonly {
  .ProseMirror {
    @apply p-0 text-xl;
  }
}

.tiptap {
  :first-child {
    margin-top: 0;
  }

  /* List styles */

  a {
    @apply cursor-pointer text-blue-600 hover:text-blue-800 underline;
  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }

  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;    

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
    @apply text-3xl;
  }

  h3 {
    @apply text-2xl;
  }

  h4,
  h5,
  h6 {
    @apply text-xl;
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