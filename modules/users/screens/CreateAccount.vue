<template>
  <div class="w-full h-full flex flex-col items-center max-w-screen-sm mx-auto">
    <div class="w-full flex flex-col items-center p-2 gap-2">
      <div v-if="activeStep === 0" class="w-full flex flex-col items-center gap-4 justify-start mb-8 mt-[58px]">
        <h1 class=" text-4xl font-bold">Vamos criar sua conta</h1>
        <p class="text-gray-500">Primeiro, vamos criar seu usuário. Depois prosseguiremos com os dados do seu perfil</p>
      </div>
      <div v-if="activeStep === 1" class="w-full flex flex-col items-center gap-4 justify-start mb-8 mt-[58px]">
        <h1 class=" text-4xl font-bold">Agora vamos criar seu perfil</h1>
        <p class="text-gray-500">Coloque um pouco mais sobre você e uma foto, para as pessoas saberem como você é</p>
      </div>
      
      <div class="w-full">
        <Steps :model="stepsItems" v-model:activeStep="activeStep" />
      </div>
      
      <Transition name="fade" mode="out-in">
        <FormCreateUser v-if="activeStep === 0" ref="formUserRef" v-model="formUser" :errors="errorsUsers" />
        <FormCreateAccount v-else ref="formRef" v-model="form" :errors="errors" />
      </Transition>

      <Button label="Criar" class="w-full mt-4" @click="onSubmit" :loading="loading" />

      <Divider v-if="activeStep === 0" />
      <div v-if="activeStep === 0" class="w-full text-center">
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
import { useMyself } from '../composables/useMyself/useMyself'

const route = useRoute()

const { user } = useMyself()
const { form, formUser, createUser, loading, errors, errorsUsers, validateForm, validateFormUser, createProfile } = useCreateAccount()

const state = ref<StateFormStype>('create-user')
const formRef = ref()
const formUserRef = ref()

const stepsItems = [
  { label: 'Usuário' },
  { label: 'Perfil' },
]
const activeStep = ref(0)

const onSubmit = async () => {
  
  if (activeStep.value == 0 && (!validateFormUser().success || !formUserRef.value.validateAll())) return
  
  if (activeStep.value === 0) {
    await createUser()
    await sleep(500)
    activeStep.value = 1
    return
  }

  if (activeStep.value === 1) {
    await createProfile()
    await sleep(500)
    navigateTo(`/auth`)
  }
}

const checkState = () => {
  state.value = route.query.state as StateFormStype

  if (state.value === 'create-profile') {
    activeStep.value = 1
    form.userId = user.value.id
  }
}

onMounted(() => {
  checkState() 
})

</script>

<style scoped>

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.2s;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateX(0px);
  transition: all 0.2s;
}
</style>