<template>
  <div class="w-full h-full flex flex-col">
    <Content>
      <template #header>
        <HeaderAuthenticated
          v-if="isLogged() && myself?.user"
          :nickname="myself?.user?.value.username || 'Usuário'"
          :profile-pic="myself?.user?.value.avatarUrl"
          @logout="handleLogout"
          @navigate-to-edit-profile="handleNavigateEditProfile"
          @navigate-to-post-create="handleNavigateToCreatePost"
        /> 
        <Header v-else @authenticate="handleAuth" @navigate-to-post-create="handlePostCreate" />
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
import HeaderAuthenticated from '@/modules/auth/components/HeaderAuthenticated.vue'

import {useSession} from '@/modules/auth/composables/useSession/useSession'
import { myselfKey, type MyselfContextProvider } from '@/modules/users/composables/useMyself/useMyself'

const myself = inject(myselfKey) as MyselfContextProvider

const { isLogged, logout } = useSession()
const router = useRouter()

const handleAuth = () => {
  router.push('/auth')
}


const navigaToPosts = () => {
  router.push('/posts')
}

const handlePostCreate = () => router.push('/posts/create')

const handleLogout = async () => {
  logout()
}

const handleNavigateEditProfile = () => {
  router.push('/profile/edit')
}

const handleNavigateToCreatePost = () => {
  router.push('/posts/create')
}
</script>