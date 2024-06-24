<template>
  <div class="w-full h-full max-w-screen-md mx-auto flex flex-col">
    <div v-if="!preview" class="card-post">
      <div class="md:px-6 mb-4">
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
          <img :src="((form.coverImage as any)?.objectURL || form.coverImageUrl) + '?c='" alt="Imagem de capa do post" class="rounded-md w-24 h-24 object-contain" />
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
        <Textarea v-model="form.title" autoResize rows="2" cols="30" class="title-post" placeholder="Insira o titulo aqui" />
        <div class="w-full bg-gray-100 h-0.5 rounded-md"></div>
        <div v-if="loading && form.id" class="flex items-center justify-center p-10 gap-2">
          Carregando informações <i class="pi pi-spin pi-spinner text-2xl"></i>
        </div>
        <Editor
          v-if="!loading"
          v-model="form.description"
          placeholder="Descrição do post aqui"
        />
      </div>
    </div>
    <div v-else class="card-post readonly">
      <img v-if="form.coverImage || form.coverImageUrl" :src="((form.coverImage as any)?.objectURL || form.coverImageUrl)" alt="Imagem de capa do post" class="w-full h-[300px] object-cover" />
      <div class="title-post">
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
        icon="pi pi-plus"
        icon-pos="left"
        :loading="loading"
        @click="handleSubmit"
      />
      <Button 
        :label="preview ? 'Voltar' : 'Pré-visualizar'" 
        outlined
        :disabled="loading"
        @click="preview = !preview"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FileUploadUploadEvent } from 'primevue/fileupload'
import type { CreatePostType } from '@/types'
import { myselfKey, type MyselfContextProvider } from '@/modules/users/composables/useMyself/useMyself'

const { user } = inject(myselfKey) as MyselfContextProvider

const services = useServices()
const route = useRoute()
const toast = useToast()

interface UploadType {
  objectURL: string
}

const props = withDefaults(
  defineProps<{
    isEdit?: boolean
  }>(),
  {
    isEdit: false
  }
)

const form = reactive<CreatePostType>({
  coverImage: null,
  title: '',
  isDraft: false,
  description: {
    blocks: [],
    time: 0,
    version: ''
  }
})

const preview = ref(false)
const loading = ref(false)

const removeFile = () => {
  form.coverImage = null
  form.coverImageUrl = null
}

const onUpload = async (event: FileUploadUploadEvent) => {
  const fileFm = Array.isArray(event.files) ? event.files[0] : event.files
  form.coverImage = fileFm
}

const handleSubmit = async () => {
  try {
    loading.value = true

    props.isEdit
      ? await services.post.editPost({
        id: form.id,
        title: form.title,
        description: form.description,
        coverImage: form.coverImage,
        isDraft: form.isDraft,
        profileId: user.value.id,
        coverImageUrl: form.coverImageUrl
      }) 
      : await services.post.createPost({
        title: form.title,
        description: form.description,
        coverImage: form.coverImage,
        isDraft: form.isDraft,
        profileId: user.value.id
      })
    
    toast.add({
      severity: 'success',
      summary: 'Sucesso!',
      detail: props.isEdit ? 'Post atualizado com sucesso' : 'Post cadastrado com sucesso',
      life: 2000
    })

    await sleep(1000)
    loading.value = false
    navigateTo('/posts')
  } catch (error) {
    loading.value = false
  }
}

const getPostById = async () => {
  const id = route.params.id as string

  if (!id || !user.value?.id || loading.value) return

  try {
    loading.value = true
    
    const postFound = await services.post.getPostByIdAndAuthor({id, userId: user.value?.id})

    if (!postFound) {
      return toast.add({
        severity: 'warn',
        summary: 'Ops!',
        detail: 'Post não encontrado',
        life: 2000
      })
    }

    Object.assign(form, postFound)

    await sleep(1000)
    loading.value = false
  } catch (error) {
    loading.value = false
  }
}

watch(
  () => user.value,
  (nVal) => {
    if (nVal && props.isEdit) {
      getPostById()
    }
  },
  {immediate: true, }
)

onMounted(() => {
  getPostById()
})

useSeoMeta({
  title: route.params.id ? 'Editar post' : 'Criar post',
  ogTitle: route.params.id ? 'Editar post' : 'Criar post',
  description: 'Crie seu post para outras pessoas verem',
  ogDescription: 'Crie seu post para outras pessoas verem',
})
</script>

<style scoped lang="scss">


.card-post {

  .title-post {
    @apply w-full font-bold text-3xl md:text-5xl placeholder:text-gray-300 text-neutral-900 py-2 md:px-6 border-none outline-none rounded-md;
  }

  @apply w-full h-full bg-white p-8 flex flex-col gap-6 rounded-md mb-4 overflow-y-auto box-border;

  &.readonly {
    @apply gap-0 p-0;

    .title-post {
      @apply pt-8 px-2 md:px-14;
    }
  }

  height: calc(100vh - 180px);
}
</style>