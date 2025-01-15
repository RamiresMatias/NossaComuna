<template>
  <div class="w-full flex flex-col items-center max-w-screen-sm mx-auto">
    <div class="w-full flex flex-col items-center p-2 gap-2">
      <div class="w-full flex flex-col items-center gap-4 justify-center mb-8">
        <h1 class=" text-4xl font-bold">Crie uma nova conta</h1>
        <p class="text-gray-500">Primeiro, vamos criar seu usuário. Depois prosseguiremos com os dados do seu perfil</p>
      </div>
      
      <div class="w-full">
        <Steps :model="stepsItems" v-model:activeStep="activeStep" />
      </div>


      <FormCreateUser v-if="activeStep === 0" ref="formUserRef" v-model="formUser" :errors="errorsUsers" />
      <FormCreateAccount v-if="activeStep === 1" ref="formRef" v-model="form" :errors="errors" />

      <Button label="Criar" class="w-full mt-4" @click="onSubmit" :loading="loading" />

      <Divider />
      <div class="w-full text-center">
        Já possui uma conta? <NuxtLink to="/auth" :prefetch="false" class="hover:text-blue-400">Logar</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormCreateAccount from '@/modules/users/components/FormCreateAccount.vue'
import FormCreateUser from '@/modules/users/components/FormCreateUser.vue'

import { useCreateAccount } from '@/modules/users/composables/useCreateAccount/useCreateAccount'
import type { StateFormStype } from '../types/users'

const route = useRoute()

const { form, formUser, createUser, loading, errors, errorsUsers, validateForm, validateFormUser } = useCreateAccount()

const state = ref<StateFormStype>('create-user')
const formRef = ref()
const formUserRef = ref()

const stepsItems = [
  { label: 'Usuário' },
  { label: 'Perfil' },
]
const activeStep = ref(0)

const onSubmit = async () => {
  
  if (activeStep.value == 0 && !validateFormUser().success || !formUserRef.value.validateAll()) return
  if (activeStep.value === 0) {
    await createUser()
    console.log('pos');
  }

  if (!validateForm().success || !formRef.value.validateAll()) return

  
}

const checkState = () => {
  state.value = route.query.state as StateFormStype
}

onMounted(() => {
  checkState() 
})

</script>