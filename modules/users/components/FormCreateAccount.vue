<template>
  <form class="w-full flex flex-col gap-4">
    <div class="flex flex-col gap-2 w-full">
      <label for="avatar">Avatar</label>
      <div class="w-full flex gap-4 items-center">
        <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" :auto="true" @upload="onUpload" chooseLabel="Escolha uma foto" />
        <Avatar v-if="modelValue.avatar" :image="(modelValue.avatar as any)?.objectURL" shape="circle" class="" />
      </div>
    </div>
    <div class="flex flex-col gap-2 w-full">
      <label for="username">Nome de usuário</label>
      <InputText id="username" placeholder="" v-model="modelValue.username"></InputText>
      <small v-if="errors?.username" class="error">{{ errors?.username._errors[0] }}</small>
    </div>
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
      <p><strong>Sua senha precisa ter:</strong></p>
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
            <span class="transition-all" :class="{
              'text-green-700': rule.test(),
              'text-red-700': !rule.test()
            }">{{ rule.label }}</span>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { FileUploadUploadEvent } from 'primevue/fileupload'
import type { ZodFormattedError } from 'zod'
import type { CreateUserType } from '~/types'

defineProps<{
  errors?: ZodFormattedError<CreateUserType>
}>()

const modelValue = defineModel<CreateUserType>({
  default: {
    avatar: null,
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  }
})

const popoverForm = ref()

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


const onUpload = async (file: FileUploadUploadEvent) => {
  const fileUp = Array.isArray(file.files) ? file.files[0] as File : undefined
  modelValue.value.avatar = fileUp
}

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