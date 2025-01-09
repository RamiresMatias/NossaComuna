<template>
  <div class="flex items-center justify-center w-full h-full">
    <div class="flex flex-col items-center justify-center gap-4 max-w-lg">
      <div class="w-full flex items-start mb-10">
        <Button label="Voltar" severity="secondary" text icon="pi pi-arrow-left" icon-pos="left" @click="back"></Button>
      </div>
      <div class="border border-solid border-primary-500 rounded-full">
        <i class="pi pi-lock text-4xl text-primary-500 p-4"></i>
      </div>
      <p class="text-xl font-medium w-full">
        Forneça um e-mail para enviarmos um link para resetar sua senha
      </p>
      <form action="" class="flex flex-col items-center w-full gap-4">
        <InputText v-model="email" placeholder="Insira o e-mail" class="w-full" type="email"></InputText>
        <Button label="Enviar" @click="sendEmail" :disabled="!email.trim()" :loading="loading" class="w-full"></Button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useForgotPassword } from '@/modules/auth/composables/useForgotPassword/useForgotPassword'

const {
  email,
  loading,
  sendEmail
} = useForgotPassword()

const router = useRouter()

const back = () => {
  router.push('/auth')
}


definePageMeta({
  layout: 'auth'
})
</script>

<style scoped>

</style>