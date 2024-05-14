<template>
  <div class="w-full h-full max-w-screen-md mx-auto flex flex-col">
    <div v-if="!preview" class="card-post">
      <div class="md:px-6 mb-4">
        <FileUpload 
          v-if="!file"
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
          <img :src="file?.objectURL" alt="Imagem de capa do post" class="rounded-md w-24 h-24" />
          <div>
            <Button 
              label="Remover"
              icon="pi pi-trash"
              severity="danger"
              icon-pos="right"
              outlined
              @click="removeFile"
            />
          </div>
        </div>
      </div>
      <div class="w-full flex flex-col gap-6">
        <Textarea v-model="form.title" autoResize rows="2" cols="30" class="title-post" placeholder="Insira o titulo aqui" />
        <div class="w-full bg-gray-100 h-0.5 rounded-md"></div>
        <Editor 
          v-model="form.description"
          placeholder="Descrição do post aqui"
        />
      </div>
    </div>
    <div v-else class="card-post readonly">
      <img v-if="file?.objectURL" :src="file?.objectURL" alt="Imagem de capa do post" class="w-full h-[300px] object-cover" />
      <div class="w-full font-bold text-xl md:text-3xl placeholder:text-gray-300 pt-8 px-2 md:px-14 border-none outline-none rounded-md text-pretty break-words">
        {{ form.title }}
      </div>
      <Editor 
        v-model="form.description"
        readonly
        class="p-2 md:p-0"
      />
    </div>
    <div class="flex gap-4 w-full justify-between">
      <Button 
        label="Salvar" 
      />
      <Button 
        :label="preview ? 'Voltar' : 'Pré-visualizar'" 
        outlined
        @click="preview = !preview"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OutputData } from '@editorjs/editorjs'
import type { FileUploadUploadEvent } from 'primevue/fileupload'

interface UploadType {
  objectURL: string
}

const titleRef = ref<HTMLTextAreaElement>()

const form = reactive<{
  description: OutputData
  title: string
}>({
  title: '',
  description: {
    blocks: [],
    time: 0,
    version: ''
  }
})

const file = ref<File & UploadType | null>()
const preview = ref(false)

const removeFile = () => {
  file.value = null
}

// const limitLines = 80

// const heightTextarea = computed(() => titleRef.value ? Math.min(titleRef.value.scrollHeight, limitLines) : 20)

const onUpload = (event: FileUploadUploadEvent) => {
  const fileFm = Array.isArray(event.files) ? event.files[0] : event.files
  file.value = {...fileFm, objectURL: (fileFm as any).objectURL}
}

const handleTitle = () => {
  // if (!titleRef.value) return

  // const el = document.getElementById('title-post')

  // if (el) {
  //   el.style.height = `${Math.min(titleRef.value.scrollHeight, limitLines)}px`
  // }
}
</script>

<style scoped lang="scss">


.card-post {

  .title-post {
    @apply w-full font-bold text-xl md:text-3xl placeholder:text-gray-300 py-2 md:px-6 border-none outline-none rounded-md;
  }

  @apply w-full h-full bg-white p-8 flex flex-col gap-6 rounded-md mb-4 overflow-y-auto box-border;

  &.readonly {
    @apply gap-0 p-0 overflow-hidden;
  }

  height: calc(100vh - 180px);
}
</style>