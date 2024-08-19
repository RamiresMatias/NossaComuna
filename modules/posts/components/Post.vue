<template>
  <NuxtLink :to=" profile ? `/${profile.username}/${code}` : ''" class="w-full mx-auto">
    <article 
      class="w-full p-4 bg-white flex gap-2 border-b border-solid justify-center border-b-gray-200 last:border-b-0 cursor-pointer rounded-md shadow-sm"
    >
      <Avatar :image="profile.avatarUrl" shape="circle" size="large" />
      <div class="w-full h-full flex flex-col gap-3">
        <div class="flex w-full justify-between items-center gap-4">
          <div class="w-full h-full flex flex-col flex-1">
            <p class=" text-base text-neutral-800 text-balance ">
              {{ profile?.username || profile?.name }}
            </p>
            <p class="text-xs text-slate-500">
              {{ new Date(createdAt).toLocaleDateString('pt-br') }}
            </p>
          </div>
        </div>
        <div class="w-full text-balance font-bold  text-xl lg:text-xl">
          {{ title }}
        </div>
        <div class="w-full flex flex-wrap gap-2 items-center">
          <Tag 
            v-for="tag in tags" 
            :key="tag.id" 
            class="flex gap-2 items-center bg-neutral-100" 
            severity="secondary"
          >
            <span class="text-gray-600 text-xs">{{ tag.description }}</span>
          </Tag>
        </div>
        <div class="w-full flex gap-4">
          <Stat class="text-primary-400" :count="likes">
            <template #preffix>
              <i class="pi pi-heart-fill"></i>
            </template>
            <template #suffix>
              {{ likes === 1 ? 'Curtida' : 'Curtidas' }}
            </template>
          </Stat>
          <Stat class="text-primary-400" :count="totalComments">
            <template #preffix>
              <i class="pi pi-comments"></i>
            </template>
            <template #suffix>
              {{ totalComments === 1 ? 'Comentário' : 'Comentários' }}
            </template>
          </Stat>
        </div>
      </div>
    </article>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { PostType } from '@/types/index'
import Stat from '@/modules/posts/components/Stat.vue'

withDefaults(
  defineProps<PostType>(),
  {
    code: 'nome-da-discussao',
    title: 'Nome da discussão que o klebin criou',
    id: '',
    coverImage: '',
    likes: 0,
    totalComments: 0,
    profile: () => Object.create({username: 'Klebin', avatarUrl: 'https://i.ibb.co/VwpJcdH/1ca5d6cede414702a3fd2eeb12bb68b8.jpg'}),
    createdAt: () => new Date(),
    tags: () => [],
  }
)
</script>

<style scoped>

</style>