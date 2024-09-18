<template>
  <section class="w-full h-full flex flex-col items-center justify-center bg-[--body-color]">
    <h1 class="w-full text-center mb-4 text-3xl lg:text-5xl grid place-items-center font-extrabold text-black h-full">
      Bem vindo a nossa Comunidade
    </h1>
    <div class="w-full h-full bg-white flex flex-col items-center justify-center gap-10">
      <p class="max-w-5xl w-full font-regular text-balance text-xl lg:text-3xl text-center text-black">
        Colabore com a comunidade. Escreva postagens, interaja 
        com as pessoas e compartilhe conhecimento
      </p>
      <Button 
        label="Ver posts" 
        severity="secondary" 
        text
        icon-pos="right"
        icon="pi pi-arrow-right"
        @click="emit('navigate-to-posts')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">

const emit = defineEmits<{
  (e: 'navigate-to-posts'): void
}>()

useHead({
  title: '👨‍💻 NossaComuna - Bem vindo'
})

useSeoMeta({
  title: '👨‍💻 NossaComuna - Bem vindo',
  ogTitle: '👨‍💻 NossaComuna - Bem vindo',
  description: 'Colabore com a comunidade. Escreva postagens, interaja com as pessoas e compartilhe conhecimento',
  ogDescription: 'Colabore com a comunidade. Escreva postagens, interaja com as pessoas e compartilhe conhecimento'
})
</script>
