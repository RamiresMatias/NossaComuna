<template>
  <NuxtLayout>
    <Toast />
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>

<script setup lang="ts">

prerenderRoutes(['/posts'])
preloadRouteComponents('/posts')

// await prefetchComponents(['Post'])


useHead({
  title: '👨‍💻 NossaComuna'
})

useSeoMeta({
  title: '👨‍💻 NossaComuna',
  ogTitle: '👨‍💻 NossaComuna',
  description: 'Colabore com a comunidade. Escreva postagens, interaja com as pessoas e compartilhe conhecimento',
  ogDescription: 'Colabore com a comunidade. Escreva postagens, interaja com as pessoas e compartilhe conhecimento'
})
</script>

<style lang="scss">
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.2s;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translate(50px, 0);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-enter-from {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate(50px, 0);
}
</style>