<template>
  <div ref="editorRef" id="editorjs" class="editorjs">

  </div>
</template>

<script setup lang="ts">
import EditorJS, { type OutputData } from '@editorjs/editorjs'
import Header from '@editorjs/header' 
import List from '@editorjs/list'
import Quote from '@editorjs/quote'
import Raw from '@editorjs/raw'
import Checklist from '@editorjs/checklist'

const modelValue = defineModel<OutputData>()

const props = defineProps<{
  placeholder?: string
  readonly?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const editorRef = ref()

const editor = new EditorJS({
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
  onChange: props.readonly ? () => {} : onChange 
})

function onChange() {
  editor
  .save()
  .then(out => {
    emit('update:modelValue', out);
  })
}

onUnmounted(() => editor.destroy())

</script>