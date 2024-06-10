<template>
  <div class="w-full flex flex-col items-center max-w-screen-sm mx-auto p-4">
    <NuxtLink to="/posts" class="mb-10 hover:bg-gray-100 p-4 transition-all rounded-md">
      <Logo size="xl" />
    </NuxtLink>
    <FormLogin v-model="form" />
    <Button 
      label="Entrar"
      class="w-full mt-4"
      :loading="loading"
      @click="authWithEmail"
    />
    <Divider align="center" class="my-8">
      <span>OU</span>
    </Divider>
    <div class="flex flex-col items-center justify-center gap-4 pb-4">
      <p>Entre com sua conta</p>
      <div class="flex gap-4 w-full items-center justify-center">
        <Button 
          label="Entrar com Gmail" 
          severity="danger"
          outlined
          icon="pi pi-google"
          icon-pos="left"
        />
        <Button 
          label="Entrar com Github" 
          severity="contrast"
          icon="pi pi-github"
          icon-pos="left"
        />
      </div>
    </div>
    <Divider />
    <div class="w-full text-center">
      É novo por aqui? <NuxtLink to="/create-account?state=buttons" class="hover:text-blue-400">Crie uma conta</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import Divider from 'primevue/divider'
import FormLogin from '@/modules/auth/components/FormLogin.vue'

const services = useServices()

const loading = ref(false)

const form = reactive<{
  email: string
  password: string
}>({
  email: '',
  password: ''
})



const authWithEmail = async () => {
  loading.value = true
  await services.auth.signInWithEmail(form.email, form.password)
  loading.value = false
}

</script>