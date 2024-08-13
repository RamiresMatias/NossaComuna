<template>
  <div class="w-full flex flex-col items-center max-w-screen-sm mx-auto p-4">
    <NuxtLink to="/posts" class="mb-10 hover:bg-gray-100 p-4 transition-all rounded-md">
      <Logo size="xl" />
    </NuxtLink>
    <FormLogin v-model="form" :errors="errors" @on-enter="handleAuthentication" />
    <Button 
      label="Entrar"
      class="w-full mt-4"
      :loading="loading"
      @click="handleAuthentication"
      @keyup.enter="handleAuthentication"
    />
    <Divider align="center" class="my-8">
      <span>OU</span>
    </Divider>
    <div class="flex flex-col items-center justify-center gap-4 pb-4">
      <p>Entre com sua conta</p>
      <div class="flex gap-4 w-full items-center justify-center">
        <Button 
          label="Entrar com G-mail" 
          severity="danger"
          outlined
          icon="pi pi-google"
          icon-pos="left"
        />
        <Button 
          label="Entrar com Github" 
          severity="contrast"
          icon="pi pi-github"
          icon-pos="left"
        />
      </div>
    </div>
    <Divider />
    <div class="w-full text-center">
      É novo por aqui? <NuxtLink to="/create-account?state=buttons" class="hover:text-blue-400">Crie uma conta</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import Divider from 'primevue/divider'
import FormLogin from '@/modules/auth/components/FormLogin.vue'

import { useAuthentication } from '@/modules/auth/composables/useAuthentication/useAuthentication'

const { form, loading, authWithEmail, errors, validateForm } = useAuthentication()

const handleAuthentication = async () => {
  if(!validateForm().success) return

  authWithEmail()
}

</script>