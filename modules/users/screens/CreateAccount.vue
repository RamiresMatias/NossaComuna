<template>
  <div class="w-full flex flex-col items-center max-w-screen-sm mx-auto">
    <div class="w-full flex flex-col items-center p-2 gap-2">
      <div class="w-full flex items-center justify-center mb-8">
        <h1 class=" text-4xl font-bold">Crie sua conta</h1>
      </div>

      <FormCreateAccount v-if="state === 'form'" ref="formRef" v-model="form" :errors />

      <Button v-if="state === 'form'" label="Criar" class="w-full mt-4" @click="onSubmit" :loading="loading" />
      <Divider />
      <div class="w-full text-center">
        Já possui uma conta? <NuxtLink to="/auth" class="hover:text-blue-400">Logar</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormCreateAccount from '@/modules/users/components/FormCreateAccount.vue'

import { useCreateAccount } from '@/modules/users/composables/useCreateAccount/useCreateAccount'

const route = useRoute()

const { form, createUser, loading, errors, validateForm } = useCreateAccount()

const state = ref<'buttons' | 'form'>('form')
const formRef = ref()

const onSubmit = async () => {

  if (!validateForm().success || !formRef.value.validateAll()) return

  createUser()
}

const checkState = () => {
  const stateQuery = route.query.state as string

  state.value = stateQuery === 'form' ? 'form' : 'buttons'
}

onMounted(() => {
  checkState() 
})

</script>