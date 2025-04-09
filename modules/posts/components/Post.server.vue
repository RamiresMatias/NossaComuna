<template>
  <NuxtLink :to=" profile ? `/${profile.username}/${code}` : ''" :prefetch="false" class="w-full mx-auto">
    <article 
      class="w-full p-5 bg-white flex flex-col gap-3 border border-solid justify-center border-gray-200 cursor-pointer rounded-md"
    >
      <div class="flex items-center gap-2">
        <NuxtImg
          v-if="profile.avatarUrl"
          :src="avatarUrl"
          alt="Avatar do autor do post"
          class="rounded-full"
          loading="lazy"
          decoding="async"
          width="40px"
          height="40px"
          :provider="null"
          :ismap="false"
        />
        <i v-else class="pi pi-user rounded-full w-10 h-10"></i>
        <div class="w-full h-full flex flex-1 gap-1 items-center">
          <p class="text-base text-surface-800 text-balance">
            {{ profile?.username }}
          </p>
          <LazyIconsDot />
          <p class="text-xs text-surface-500">
            {{ createdAt }}
          </p>
        </div>
      </div>
      <div class="w-full h-full flex flex-col gap-3">
        <h1 class="w-full text-lg font-normal">
          {{ title }}
        </h1>
        <div class="w-full flex flex-wrap gap-2 items-center">
          <Tag 
            v-for="tag in tags" 
            :key="tag.id" 
            class="flex gap-2 items-center bg-primary-50" 
            severity="secondary"
          >
            <span class="text-surface-900 text-xs font-light">{{ tag.description }}</span>
          </Tag>
        </div>
        <div class="w-full flex gap-4 flex-wra">
          <Stat class="text-surface-500 text-xs" :count="likes">
            <template #preffix>
              <i class="pi pi-heart-fill"></i>
            </template>
            <template #suffix>
              {{ likes === 1 ? 'Curtida' : 'Curtidas' }}
            </template>
          </Stat>
          <Stat class="text-surface-500 text-xs" :count="comments">
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

const props = defineProps<PostType>()

const avatarUrl = computed(() => getImageNoCache(props?.profile?.avatarUrl))
</script>