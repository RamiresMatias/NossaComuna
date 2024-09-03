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

import {useSession} from '@/modules/auth/composables/useSession/useSession'

const { logout } = useSession()
const router = useRouter()

const handleAuth = () => {
  router.push('/auth')
}

const navigaToPosts = () => {
  router.push('/posts')
}
</script>