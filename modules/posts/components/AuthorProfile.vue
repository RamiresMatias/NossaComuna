<template>
  <div class="w-full max-h-96 bg-white shadow-sm border-t-[30px] border-t-primary-600 border-solid rounded-md flex flex-col gap-5 box-border p-4">
    <NuxtLink :to="`/${username}`" :prefetch="false" class="flex gap-2 items-end -mt-8">
      <Avatar :image="avatarUrl" shape="circle" size="large" aria-label="Avatar do autor do post" alt="Avatar do autor do post" />
      <span class="font-bold text-gray-700 text-lg hover:text-blue-900">{{ username }}</span>
    </NuxtLink>
    <div v-if="bio" class="font-medium text-slate-500">
      {{ bio }}
    </div>
    <div class="info">
      <span class="info__title">Email</span>
      <span class="info__description">{{ email }}</span>
    </div>
    <div class="info">
      <span class="info__title">Entrou em</span>
      <span v-if="createdAt" class="info__description">{{ new Date(createdAt).toLocaleDateString('pt-br') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Profile } from '@/types'


withDefaults(
  defineProps<Profile>(),
  {
    avatarUrl: '',
    bio: '',
    createdAt: () => null,
    email: '',
    id: '',
    username: ''
  }
)
</script>

<style lang="scss"scoped>
.info {
  @apply flex flex-col  text-sm;

  &__title {
    @apply font-semibold text-neutral-800;
  }

  &__description {
    @apply text-slate-500 font-medium;
  }
}
</style>