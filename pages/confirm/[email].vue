<template>
  <div class="flex items-center justify-center">
    <div class="rounded-md shadow-md bg-white flex items-center p-6 gap-4">
      <div>
        <i class="pi pi-info-circle text-3xl text-blue-500"></i>
      </div>
      <div class="flex flex-col gap-3">
        <p>Uma confirmação de e-mail foi enviada para o e-mail: <strong>{{ email }}</strong></p>
        <p>
          Verifique o e-mail, para validar o usuário e conseguir realizar o login na plataforma
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const route = useRoute()

const email = computed(() => route.params.email)
</script>

<style scoped>

</style>