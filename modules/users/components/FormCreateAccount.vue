<template>
  <form class="w-full flex flex-col gap-4">
    <div class="flex flex-col gap-2 w-full">
      <label for="avatar">Avatar</label>
      <InputText id="avatar" type="file" placeholder="" v-model="modelValue.avatar"></InputText>
    </div>
    <div class="flex flex-col gap-2 w-full">
      <label for="username">Username</label>
      <InputText id="username" placeholder="" v-model="modelValue.username"></InputText>
    </div>
    <div class="flex flex-col gap-2 w-full">
      <label for="email">E-mail</label>
      <InputText id="email" type="email" placeholder="" v-model="modelValue.email"></InputText>
    </div>
    <div class="flex flex-col gap-2 w-full">
      <label for="password">Senha</label>
      <InputText id="password" type="password" placeholder="" v-model="modelValue.password"></InputText>
    </div>
    <div class="flex flex-col gap-2 w-full">
      <label for="confirmPassword">Confirma a senha</label>
      <InputText id="confirmPassword" type="password" placeholder="" v-model="modelValue.confirmPassword"></InputText>
    </div>
  </form>
</template>

<script setup lang="ts">


const modelValue = defineModel<{
  avatar: string
  email: string
  password: string
  confirmPassword: string
  username: string
}>({
  default: {
    avatar: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  }
})

</script>