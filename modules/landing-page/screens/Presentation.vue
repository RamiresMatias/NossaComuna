<template>
  <div class="w-full h-full flex flex-col">
    <Content>
      <template #content>
        <Hero @navigate-to-posts="navigaToPosts" />
      </template>
    </Content>
  </div>
</template>

<script setup lang="ts">
import Hero from '@/modules/landing-page/components/Hero.vue'
import Content from '@/modules/landing-page/components/Content.vue'

const router = useRouter()

const navigaToPosts = () => {
  router.push('/')
}

useHead({
  title: '👨‍💻 NossaComuna - Bem vindo a NossaComuna'
})

useSeoMeta({
  title: '👨‍💻 NossaComuna - Bem vindo a NossaComuna',
  ogTitle: '👨‍💻 NossaComuna - Bem vindo a NossaComuna',
  description: 'Colabore com a comunidade. Escreva postagens, interaja com as pessoas e compartilhe conhecimento',
  ogDescription: 'Colabore com a comunidade. Escreva postagens, interaja com as pessoas e compartilhe conhecimento'
})
</script>