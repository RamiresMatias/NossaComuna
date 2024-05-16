<template>
  <form class="w-full flex flex-col gap-4">
    <div class="flex flex-col gap-2 w-full">
      <label for="email">E-mail</label>
      <InputText id="email" type="email" placeholder="" v-model="modelValue.email"></InputText>
    </div>
    <div class="flex flex-col gap-2 w-full">
      <label for="password">Senha</label>
      <InputText id="password" type="password" placeholder="" v-model="modelValue.password"></InputText>
    </div>
  </form>
</template>

<script setup lang="ts">

const modelValue = defineModel<{
  email: string
  password: string
}>({
  default: {
    email: '',
    password: ''
  }
})

</script>