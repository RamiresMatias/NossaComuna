<template>
  <div class="w-full h-full max-w-screen-md mx-auto flex flex-col">
    <FormEditor v-model="form" :errors="errors" />
    <div class="flex gap-4 w-full justify-end">
      <Button 
        label="Salvar"
        icon="pi pi-plus"
        icon-pos="left"
        :loading="loading"
        :disabled="loading"
        @click="handleCreate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostCreate } from '@/modules/posts/composables/usePostCreate/usePostCreate'

import FormEditor from '@/modules/posts/components/FormEditor.vue' 

const { create, form, loading, errors, validateForm,  } = usePostCreate()

const handleCreate = async () => {

  const isValid = validateForm().success

  if(!isValid) return

  create()
}

useSeoMeta({
  title: 'Criar post',
  ogTitle: 'Criar post',
  description: 'Crie seu post para outras pessoas verem',
  ogDescription: 'Crie seu post para outras pessoas verem',
})
</script>