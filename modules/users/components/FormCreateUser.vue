<template>
  <form class="w-full flex flex-col gap-4" autocomplete="off">
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
    <div class="flex flex-col gap-2 w-full">
      <label for="confirmPassword">Confirma a senha</label>
      <InputText id="confirmPassword" type="password" placeholder="" v-model="modelValue.confirmPassword"></InputText>
      <small v-if="errors?.confirmPassword" class="error">{{ errors?.confirmPassword._errors[0] }}</small>
    </div>

    <div class="flex flex-col gap-4 w-[25rem] text-sm">
      <h5 class="m-0 p-0 text-base font-semibold">Sua senha precisa ter:</h5>
      <div class="flex flex-col gap-4 items-start justify-start">
        <div
          v-for="rule in rules"
          :key="rule.name"
          class="flex items-center justify-start gap-2 transition-all"
        >
            <Transition name="slide-fade" mode="out-in">
              <i v-if="!rule.test()" class="pi pi-times text-red-700"></i>
              <i v-else class="pi pi-check-circle text-green-700"></i>
            </Transition>
            <span class="text-neutral-500">{{ rule.label }}</span>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { ZodFormattedError } from 'zod'
import type { ICreateUser } from '../types/users';

defineProps<{
  errors?: ZodFormattedError<ICreateUser>
}>()

const modelValue = defineModel<ICreateUser>({
  default: {
    email: '',
    password: '',
    confirmPassword: '',
  }
})

const rules = computed(() => [
  {
    name: 'minCharacter',
    label: 'No mínimo 8 caracteres',
    test: () => /^.{8,16}$/.test(modelValue.value.password)
  },
  {
    name: 'containsNumberOrSymbol',
    label: 'Deve conter um número ou caracter especial',
    test: () => /\d/g.test(modelValue.value.password) || /\W/g.test(modelValue.value.password)
  },
  {
    name: 'containsCapitalLetter',
    label: 'Deve conter ao menos uma letra maiúscula',
    test: () => /[A-Z]/g.test(modelValue.value.password)
  },
  {
    name: 'passwordEquals',
    label: 'As duas senhas precisam ser iguais',
    test: () => modelValue.value.password && modelValue.value.confirmPassword && modelValue.value.password === modelValue.value.confirmPassword
  }
])

const validateAll = () => {
  return rules.value.every(rule => !!rule.test())
}

defineExpose({
  validateAll
})

</script>

<style scoped lang="scss">

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}

</style>