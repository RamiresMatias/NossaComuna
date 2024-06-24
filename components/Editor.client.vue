<template>
  <div id="editorjs" class="editorjs">

  </div>
</template>

<script setup lang="ts">
import EditorJS, { type OutputData } from '@editorjs/editorjs'
import Header from '@editorjs/header' 
import List from '@editorjs/list'
import Quote from '@editorjs/quote'
import Raw from '@editorjs/raw'
import Checklist from '@editorjs/checklist'

const props = defineProps<{
  placeholder?: string
  readonly?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const modelValue = defineModel<OutputData>()

const editor = ref<EditorJS>()

onMounted(() => {
  editor.value = new EditorJS({
    holder: 'editorjs',
    tools: { 
      heading: Header,
      List,
      Checklist,
      Quote,
      Raw,
    },
    placeholder: props.placeholder || 'Descreva o post aqui',
    data: modelValue.value,
    readOnly: props.readonly,
    onChange: props.readonly ? () => {} : (api, event) => {
      api.saver.save().then(async (data) => {
        emit("update:modelValue", data)
      })
    },
    onReady: () => {
      modelValue.value && editor.value?.render(modelValue.value)
    }
  })
})

onUnmounted(() => editor.value?.destroy?.())

</script>

<style lang="scss">
.editorjs {
  .ce-header {
    @apply text-neutral-900 font-bold;
  }
  h1.ce-header{
    @apply text-[34px] md:text-5xl  leading-[34px] -tracking-wider;
  }
  h2.ce-header{
    @apply text-[18px] md:text-[30px] leading-[32px] -tracking-wider;
  }
  h3.ce-header{
    @apply text-[18px] md:text-2xl leading-[26px] -tracking-wide;
  }
  h4.ce-header{
    @apply text-[18px] md:text-xl -tracking-wide;
  }
  h5.ce-header{
    @apply text-[18px];
  }
  h6.ce-header{
    @apply text-[16px];
  }

  .codex-editor__redactor {
    padding-bottom: 100px !important;
  }
}
</style>