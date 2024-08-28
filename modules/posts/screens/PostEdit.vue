<template>
  <div class="w-full h-full max-w-screen-md mx-auto flex flex-col">
    <FormEditor v-model="form" :errors="errors" :loading="loading" />
    <div class="flex gap-4 w-full justify-between">
      <Button 
        label="Salvar"
        icon="pi pi-plus"
        icon-pos="left"
        :loading
        @click="handleUpdate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostEdit } from '@/modules/posts/composables/usePostEdit/usePostEdit'

import FormEditor from '@/modules/posts/components/FormEditor.vue' 

const route = useRoute()

const { update, form, loading, errors, validateForm } = usePostEdit((route.params.id as string))

const handleUpdate = async () => {

  const isValid = validateForm().success

  if(!isValid) return

  update()
}

useSeoMeta({
  title: 'Editar post',
  ogTitle: 'Editar post',
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