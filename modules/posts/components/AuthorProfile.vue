<template>
  <div class="w-full max-h-96 bg-white shadow-sm border-t-[30px] border-t-primary-600 border-solid rounded-md flex flex-col gap-5 box-border p-4">
    <NuxtLink :to="`/${username}`" class="flex gap-2 items-end -mt-8">
      <Avatar :image="avatarUrl" shape="circle" size="large" />
      <span class="font-bold text-gray-700 text-lg hover:text-blue-900">{{ username }}</span>
    </NuxtLink>
    <div class="font-[Inter] font-regular text-gray-500">
      {{ bio }}
    </div>
    <div class="info">
      <span class="info__title">Email</span>
      <span class="info__description">{{ email }}</span>
    </div>
    <div class="info">
      <span class="info__title">Entrou em</span>
      <span class="info__description">{{ createdAt?.toLocaleDateString('pt-br') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Profile } from '@/types'


withDefaults(
  defineProps<Profile>(),
  {
    avatarUrl: 'http://127.0.0.1:54321/storage/v1/object/public/avatars/bd6a03fa-ebc1-4f59-9e8d-c77a30aa6d73/bd6a03fa-ebc1-4f59-9e8d-c77a30aa6d73',
    bio: 'Software Developer',
    createdAt: () => new Date(),
    email: 'teste@teste.com.br',
    id: '',
    username: 'Usuário teste'
  }
)
</script>

<style scoped>
.info {
  @apply flex flex-col font-[Inter] text-sm;

  &__title {
    @apply font-semibold text-gray-600;
  }

  &__description {
    @apply text-neutral-500;
  }
}
</style>