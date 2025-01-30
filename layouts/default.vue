<template>
  <div class="w-full h-full flex flex-col items-center">
    <MainContent>
      <template #header>
        <HeaderLoading v-if="loading"></HeaderLoading>
        <HeaderAuthenticated
          v-if="!loading && user.id"
          :nickname="user?.username || 'Usuário'"
          :profile-pic="user?.avatarUrl"
          :loading="loading"
          @logout="handleLogout"
          @navigate-to-edit-profile="handleNavigateEditProfile"
          @navigate-to-post-create="handleNavigateToCreatePost"
        /> 
        <Header v-if="!loading && !user?.id" @authenticate="handleAuth" @navigate-to-post-create="handlePostCreate" />
      </template>
      <template #content>
        <main class="h-full">
          <slot></slot>
        </main>
      </template>
    </MainContent>
  </div>
</template>

<script lang="ts" setup>
import HeaderAuthenticated from '@/modules/auth/components/HeaderAuthenticated.vue'
import { useMyself } from '@/modules/users/composables/useMyself/useMyself'

const { user, loading, logout } = useMyself()

const router = useRouter()

const handleAuth = () => {
  router.push('/auth')
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