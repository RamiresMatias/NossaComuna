<template>
  <div class="w-full h-full flex flex-col">
    <Content>
      <template #header>
        <Header @authenticate="handleAuth" @navigate-to-post-create="handlePostCreate" />
      </template>
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

const handleAuth = () => {
  console.log('handleAuth');
}

const navigaToPosts = () => {
  router.push('/posts')
}

const handlePostCreate = () => router.push('/posts/create')
</script>