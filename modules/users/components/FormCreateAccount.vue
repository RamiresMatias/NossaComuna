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
      <label for="username">Nome de usuário</label>
      <InputText id="username" placeholder="" v-model="modelValue.username"></InputText>
    </div>
    <div class="flex flex-col gap-2 w-full">
      <label for="bio">Bio</label>
      <InputText id="bio" placeholder="Ex: Software Engineer" v-model="modelValue.bio"></InputText>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { FileUploadUploadEvent } from 'primevue/fileupload'
import type { ZodFormattedError } from 'zod'
import type { ICreateProfile } from '../types/users';

defineProps<{
  errors?: ZodFormattedError<ICreateProfile>
}>()

const modelValue = defineModel<ICreateProfile>({
  default: {
    avatar: null,
    username: '',
    bio: null
  }
})

const onUpload = async (file: FileUploadUploadEvent) => {
  const fileUp = Array.isArray(file.files) ? file.files[0] as File : undefined
  modelValue.value.avatar = fileUp
}

</script>

<style scoped lang="scss">

</style>