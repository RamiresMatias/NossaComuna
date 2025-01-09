<template>
  <form class="w-full flex flex-col gap-4" @keyup.enter="emit('onEnter')">
    <div class="flex flex-col gap-2 w-full">
      <label for="email">E-mail</label>
      <InputText id="email" type="email" placeholder="" v-model="modelValue.email"></InputText>
      <small v-if="errors?.email" class="error">{{ errors?.email._errors[0] }}</small>
    </div>
    <div class="flex flex-col gap-2 w-full">
      <label for="password">Senha</label>
      <InputText id="password" type="password" placeholder="" v-model="modelValue.password"></InputText>
      <small v-if="errors?.password" class="error">{{ errors?.password._errors[0] }}</small>
    </div>
    <div class="w-full">
      <NuxtLink disabled to="/forgot-password" :prefetch="false" class="hover:text-blue-400">Esqueceu a senha?</NuxtLink>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { ZodFormattedError } from 'zod';


interface AuthProps {
  email: string
  password: string
}

const emit = defineEmits<{
  (e: 'onEnter'): void
}>()

defineProps<{
  errors?: ZodFormattedError<AuthProps>
}>()

const modelValue = defineModel<AuthProps>({
  default: {
    email: '',
    password: ''
  }
})

</script>