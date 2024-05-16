<template>
  <div class="w-full flex flex-col items-center max-w-screen-sm mx-auto">
    <div class="w-full flex flex-col items-center p-2 gap-2">
      <div class="w-full flex items-center justify-center mb-8">
        <h1 class="font-[Inter] text-4xl font-bold">Crie sua conta</h1>
      </div>

      <FormCreateAccount v-if="state === 'form'" v-model="form" />
      <ButtonsGroup v-else-if="state === 'buttons'" @on-create-email="state = 'form'" />

      <Button label="Criar" class="w-full mt-4" @click="onSubmit" />
      <Divider />
      <div class="w-full text-center">
        já possui uma conta? <NuxtLink to="/auth" class="hover:text-blue-400">Logar</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormCreateAccount from '@/modules/users/components/FormCreateAccount.vue'
import ButtonsGroup from '@/modules/users/components/ButtonsGroup.vue'

const state = ref<'buttons' | 'form'>('buttons')

const route = useRoute()

const form = reactive<{
  avatar: string
  email: string
  password: string
  confirmPassword: string
  username: string
}>({
  avatar: '',
  email: '',
  password: '',
  confirmPassword: '',
  username: ''
})

const onSubmit = async () => {

}

const checkState = () => {
  const stateQuery = route.query.state as string

  if (!stateQuery) state.value = 'buttons'

  state.value = stateQuery === 'form' ? 'form' : 'buttons'
}

onMounted(() => {
  checkState() 
})

</script>