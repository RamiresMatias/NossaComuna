<template>
  <HeadlineEdit 
    :username="form.username!" 
    :avatar-url="linkNewFile|| form.avatarUrl || ''" 
    @navigate-to-profile="() => {}"
    @share="() => {}"
    class="my-10"
  />
  <Widget title="Informações básicas">
    <form class="w-full flex flex-col gap-4">
      <div class="flex flex-col gap-2 w-full">
        <label for="avatar">Avatar</label>
        <div class="w-full flex gap-4 items-center">
          <FileUpload mode="basic" name="userAvatar" url="/api/upload" accept="image/png, image/jpeg" :auto="true" @upload="onUpload" chooseLabel="Escolha uma foto" />
        </div>
      </div>
      <div class="flex flex-col gap-2 w-full">
        <label for="email">E-mail</label>
        <InputText id="email" disabled type="email" placeholder="teste@gmail.com" v-model="form.email"></InputText>
      </div>
      <div class="flex flex-col gap-2 w-full">
        <label for="username">Username</label>
        <InputText id="username" placeholder="User123" v-model="form.username"></InputText>
      </div>
      <div class="flex flex-col gap-2 w-full">
        <label for="bio">Bio</label>
        <InputText id="bio" placeholder="Trabalho com..." v-model="form.bio"></InputText>
      </div>
    </form>
  </Widget>

  <Button
    @click="handleUpdateProfile()"
    :loading="loading"
    class="mt-5 w-full md:w-auto"
    label="Atualizar"
    icon="pi pi-pencil"
    icon-pos="right"
  ></Button>
</template>

<script setup lang="ts">
import HeadlineEdit from '@/modules/users/components/HeadlineEdit.vue'

import { useMyself } from '@/modules/users/composables/useMyself/useMyself'
import type { FileUploadUploadEvent } from 'primevue/fileupload'
import type { Profile } from '~/types'

const { user, fetchUser } = useMyself()
const services = useServices()

const form = reactive<Profile>({
  id: '',
  avatarUrl: '',
  email: '',
  username: '',
  bio: '',
  createdAt: new Date()
})

const loading = ref(false)
const newFile = ref()
const toast = useToast()
const linkNewFile = ref()

watch(
  () => user.value,
  () => {
    loadUserInfo()
  }
)

const loadUserInfo = () => {
  Object.assign(form, user.value)
}

const onUpload = async (file: FileUploadUploadEvent) => {
  const fileUp = Array.isArray(file.files) ? file.files[0] as File : undefined
  newFile.value = fileUp
  const { link } = await customBase64Uploader(fileUp)
  linkNewFile.value = link
}

const handleUpdateProfile = async () => {
  try {
    if (!form.id) return
    loading.value = true
    await services.users.update(form.id, {
      username: form.username || '',
      bio: form.bio,
      avatar: newFile.value,
      avatarUrl: form.avatarUrl
    })
    
    window.location.reload()

    toast.add({
      severity: 'success',
      summary: 'Sucesso!',
      detail: 'Perfil atualizado com sucesso!',
      life: 2000
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Ops!',
      detail: 'Ocorreu um erro ao tentar atualizar o perfil!',
      life: 2000
    })
  } finally {
    loading.value = false
  }
}
</script>