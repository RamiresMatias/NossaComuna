<template>
  <form class="w-full flex flex-col gap-4">
    <div class="flex flex-col gap-2 w-full">
      <label for="avatar">Avatar</label>
      <div class="w-full flex gap-4 items-center">
        <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" :auto="true" @upload="onUpload" chooseLabel="Escolha uma foto" />
        <Avatar v-if="modelValue.avatar" :image="(modelValue.avatar as any)?.objectURL" shape="circle" class="" />
      </div>
    </div>
    <div class="flex flex-col gap-2 w-full">
      <label for="username">Username</label>
      <InputText id="username" placeholder="" v-model="modelValue.username"></InputText>
    </div>
    <div class="flex flex-col gap-2 w-full">
      <label for="email">E-mail</label>
      <InputText id="email" type="email" placeholder="" v-model="modelValue.email"></InputText>
    </div>
    <div class="flex flex-col gap-2 w-full">
      <label for="password">Senha</label>
      <InputText id="password" type="password" placeholder="" v-model="modelValue.password"></InputText>
    </div>
    <div class="flex flex-col gap-2 w-full">
      <label for="confirmPassword">Confirma a senha</label>
      <InputText id="confirmPassword" type="password" placeholder="" v-model="modelValue.confirmPassword"></InputText>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { FileUploadUploadEvent } from 'primevue/fileupload'

const modelValue = defineModel<{
  avatar: File
  email: string
  password: string
  confirmPassword: string
  username: string
}>({
  default: {
    avatar: null,
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  }
})

const fileLink = ref()

const onUpload = async (file: FileUploadUploadEvent) => {
  const fileUp = Array.isArray(file.files) ? file.files[0] as File : undefined
  modelValue.value.avatar = fileUp
}


const file = ref<File>()
</script>