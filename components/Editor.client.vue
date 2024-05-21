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
      Header,
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
  })
})

onUnmounted(() => editor.value?.destroy())

</script>

<style lang="scss">
.editorjs {
  h1.ce-header{
    @apply text-5xl text-black font-bold;
  }
}
</style>