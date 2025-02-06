<template>
  <NuxtLink :to=" profile ? `/${profile.username}/${code}` : ''" :prefetch="false" class="w-full mx-auto">
    <article 
      class="w-full p-4 bg-white flex flex-col gap-2 border-b border-solid justify-center border-b-gray-200 last:border-b-0 cursor-pointer rounded-md shadow-sm"
    >
      <div class="flex items-center gap-2">
        <NuxtImg
          v-if="profile.avatarUrl"
          :src="profile.avatarUrl"
          alt="Avatar do autor do post"
          class="rounded-full"
          loading="lazy"
          decoding="async"
          width="40px"
          height="40px"
          format="webp"
          :ismap="false"
        />
        <i v-else class="pi pi-user rounded-full w-10 h-10"></i>
        <div class="w-full h-full flex flex-col flex-1">
          <p class=" text-base text-neutral-800 text-balance ">
            {{ profile?.username }}
          </p>
          <p class="text-xs text-gray-600">
            {{ new Date(createdAt).toLocaleDateString('pt-br') }}
          </p>
        </div>
      </div>
      <div class="w-full h-full flex flex-col gap-3 pl-0 lg:pl-12">
        <h1 class="w-full text-lg font-medium">
          {{ title }}
        </h1>
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
        <div class="w-full flex gap-4 flex-wrap">
          <Stat class="text-primary-600" :count="likes">
            <template #preffix>
              <i class="pi pi-heart-fill"></i>
            </template>
            <template #suffix>
              {{ likes === 1 ? 'Curtida' : 'Curtidas' }}
            </template>
          </Stat>
          <Stat class="text-primary-600" :count="comments">
            <template #preffix>
              <i class="pi pi-comments"></i>
            </template>
            <template #suffix>
              {{ comments === 1 ? 'Comentário' : 'Comentários' }}
            </template>
          </Stat>
        </div>
      </div>
    </article>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { PostType } from '@/types/index'

const Stat = resolveComponent('Stat')

defineProps<PostType>()
</script>