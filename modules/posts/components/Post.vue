<template>
  <NuxtLink :to=" profile ? `/${profile.username}/${code}` : ''" class="w-full mx-auto">
    <article 
      class="w-full p-4 bg-white flex gap-2 border-b border-solid justify-center border-b-gray-200 last:border-b-0 cursor-pointer rounded-md shadow-sm"
    >
      <img :src="profile?.avatarUrl" alt="Foto de perfil do usuário" class="w-10 h-10 rounded-full mt-1" />
      <div class="w-full h-full flex flex-col gap-3">
        <div class="flex w-full justify-between items-center gap-4">
          <div class="w-full h-full flex flex-col flex-1">
            <p class=" text-base lg:text-lg text-gray-700 font-medium text-balance font-[Inter]">
              {{ profile?.username || profile?.name }}
            </p>
            <p class="text-sm font-[Inter] font-regular text-gray-400">
              {{ new Date(createdAt).toLocaleDateString('pt-br') }}
            </p>
          </div>
        </div>
        <div class="w-full text-balance font-bold font-[Inter] text-xl lg:text-xl mb-2">
          {{ title }}
        </div>
        <div class="w-full flex gap-4">
          <Stat :count="totalLikes">
            <template #icon>
              <i class="pi pi-heart-fill"></i>
            </template>
          </Stat>
          <Stat :count="totalComments">
            <template #icon>
              <i class="pi pi-comments"></i>
            </template>
          </Stat>
        </div>
      </div>
    </article>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Post } from '@/types/index'
import Stat from '@/modules/posts/components/Stat.vue'

withDefaults(
  defineProps<Post>(),
  {
    code: 'nome-da-discussao',
    title: 'Nome da discussão que o klebin criou',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, ullam, 
      quibusdam accusantium ipsum soluta explicabo iure, consectetur cupiditate necessitatibus odio natus commodi 
      corrupti! Deleniti perferendis laudantium rem voluptatum repellendus magnam!`,
    id: '',
    coverImage: '',
    totalLikes: 0,
    totalComments: 0,
    profile: () => Object.create({username: 'Klebin', avatarUrl: 'https://i.ibb.co/VwpJcdH/1ca5d6cede414702a3fd2eeb12bb68b8.jpg'}),
    createdAt: () => new Date(),
    tags: () => [],
  }
)
</script>

<style scoped>

</style>