<template>
  <HeadlineEdit
    :username="form.username!" 
    :avatar-url="linkNewFile|| form.avatarUrl || ''" 
    @navigate-to-profile="handleNavigationToProfile"
    @share="() => {}"
    class="my-10"
  />
  <Widget title="Informações básicas" class="m-4">
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
    @click="update"
    :loading="loading"
    class="mt-5 w-full md:w-auto ml-4"
    label="Atualizar"
    icon="pi pi-pencil"
    icon-pos="right"
  ></Button>
</template>

<script setup lang="ts">
import HeadlineEdit from '@/modules/users/components/HeadlineEdit.vue'

import type { FileUploadUploadEvent } from 'primevue/fileupload'

import { useUser } from '@/modules/users/composables/useUser/useUser'
import { useUserUpdate } from '@/modules/users/composables/useUserUpdate/useUserUpdate'
import { useSession } from '@/modules/auth/composables/useSession/useSession'

const session = useSession()

const { user, loading } = useUser(session.user.value.id)
const { form, update } = useUserUpdate({user})

const linkNewFile = ref()

const onUpload = async (file: FileUploadUploadEvent) => {
  const fileUp = Array.isArray(file.files) ? file.files[0] as File : undefined
  form.avatar = fileUp
  const { link } = await customBase64Uploader(fileUp)
  linkNewFile.value = link
}

const handleNavigationToProfile = () => {
  navigateTo(`/${form.username}`)
}
</script>