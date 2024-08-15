<template>
  <form class="card-post" onkeypress="return event.keyCode != 13"> 
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
        <img :src="((form.coverImage as any)?.objectURL || (form.coverImageUrl + '?c=' + new Date()))" alt="Imagem de capa do post" class="rounded-md w-24 h-24 object-contain" />
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
      <div class="select-tag">
        <ul class="select-tag__list">
          <li v-for="(tag, i) in tagsSelected" :key="`${i}-${tag}`" class="select-tag__item">
            <Tag class="flex gap-2 items-center bg-neutral-100" severity="secondary">
              <span class="text-gray-600 text-base">{{ tag.description }}</span>
              <i
                class="pi pi-times cursor-pointer text-neutral-900 hover:text-red-400 flex items-center justify-center rounded-full
                transition-all text-base"
                @click="removeTag(i)"
              ></i>
            </Tag>
          </li>
          <li v-if="tagsSelected.length < 4" class="select-tag__input">
            <input 
              type="text" 
              placeholder="Adicione 4 tags"
              v-model="search" 
              :disabled="loadingTags"
              @focus="openDropdown"
              @keyup.prevent.enter="handleEnterTag"
            />
            <div v-if="showDropdown" class="select-tag__options">
              <div class="w-full border-b border-b-solid border-b-neutral-200 p-3 flex items-center justify-between">
                <h3 class="font-bold text-lg">Selecione uma tag</h3>
                <i
                  class="pi pi-times cursor-pointer text-neutral-900 hover:text-red-400 flex items-center justify-center rounded-full
                  transition-all text-base"
                  @click="showDropdown = false"
                ></i>
              </div>
              <ul class="flex flex-col items-start justify-start w-full" >
                <li 
                  v-for="item in filteredList" 
                  :key="item.id" 
                  class="select-tag__options__tag"
                  @click="selectTag(item)"
                >
                  {{ item.description }}
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <small v-if="errors?.title" class="error ml-8">{{ errors?.title._errors[0] }}</small>
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
    <TiptapEditor v-if="!loading" ref="tiptapRef" v-model="form.description" :readonly="false"></TiptapEditor>
    <div v-else class="flex items-center justify-center p-10 gap-2">
      Carregando conteúdo <i class="pi pi-spin pi-spinner text-2xl"></i>
    </div>
    <small v-if="errors?.description" class="error ml-8">{{ errors?.description._errors[0] }}</small>
  </form>
</template>

<script setup lang="ts">
import type { FileUploadUploadEvent } from 'primevue/fileupload'
import type { ZodFormattedError } from 'zod'
import type { CreatePostType, EditPostType, Tag } from '~/types'

import { useTag } from '@/modules/tag/composables/useTag/useTag'
import { usePostTag } from '@/modules/tag/composables/usePostTag/usePostTag'

type FormEditorProps = CreatePostType | EditPostType

defineProps<{
  errors?: ZodFormattedError<FormEditorProps>
  loading?: boolean
}>()


const form = defineModel<CreatePostType | EditPostType>()

const { filteredList, search, create, loading: loadingTags } = useTag()
const { postTags } = usePostTag()

const tagsSelected = ref<Tag[]>([])
const tiptapRef = ref()
const showDropdown = ref(false)

const removeFile = () => {
  form.value.coverImage = null
  form.value.coverImageUrl = null
}

const onUpload = async (event: FileUploadUploadEvent) => {
  const fileFm = Array.isArray(event.files) ? event.files[0] : event.files
  form.value.coverImage = fileFm
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

const handleEnterTag = async () => {
  const tagFound = filteredList.value.find((el) => el.description.toLowerCase() === search.value.trim().toLowerCase())
  if (tagFound) return selectTag(tagFound)
  
  const newTag = await create(search.value.trim())

  if (newTag) tagsSelected.value.push(newTag)

}

const selectTag = (tag: Tag) => {
  const hasSelected = tagsSelected.value.some(el => el.id === tag.id)
  if (hasSelected) return
  tagsSelected.value.push(tag)
  showDropdown.value = false
  search.value = ''
}

const removeTag = (index: number) => {
  tagsSelected.value.splice(index, 1)
}

const openDropdown = () => {
  showDropdown.value = true
}

</script>

<style scoped lang="scss">
.card-post {
  @apply w-full h-full max-h-[750px] bg-white flex flex-col gap-6 rounded-md mb-4 overflow-y-auto py-8;
  
  &.readonly {
    @apply gap-0 p-0;

    .title-post {
      @apply pt-8 px-2 md:px-14;
    }
  }

  .title-post {
    @apply px-8 w-full font-bold text-3xl md:text-5xl text-neutral-900 border-none outline-none rounded-md
    focus:ring-0 resize-none;
  }

  .select-tag {
    @apply w-full px-8;

    &__list {
      @apply w-full flex flex-wrap items-center gap-2 list-none relative;
    }

    &__input {
      input {
        @apply outline-none border-none p-2;
      }
    }

    &__input:focus-within .select-tag__options {
      @apply opacity-100 transition-all flex-col items-center justify-start;
    }

    &__options {
      @apply transition-all delay-500 absolute top-10 left-0 h-[200px] z-10
      w-[400px] rounded-md bg-white overflow-y-auto shadow-md border border-solid border-neutral-200;

      &__tag {
        @apply transition-all w-full hover:bg-neutral-100 cursor-pointer p-3;
      }
    }
    
  }
}
</style>