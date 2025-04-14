<template>
    <article 
      class="w-full p-4 bg-white flex flex-col gap-1 border border-solid justify-center border-gray-200 rounded-md"
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
        <div class="flex flex-col">
          <span class="font-medium text-gray-900">{{ profile?.username }}</span>
          <span class="text-xs text-gray-500">{{ createdAt }}</span>
        </div>

      </div>
      <div class="w-full h-full flex flex-col gap-3">
        <NuxtLink 
          :to="profile ? `/${profile.username}/${code}` : ''" 
          class="hover:text-blue-800 w-full text-xl font-bold text-gray-900 hover:text-brand transition-colors duration-200"
        >
          {{ title }}
        </NuxtLink>
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
        <div class="w-full flex gap-4 flex-wrap">
          <Stat class="text-surface-500 text-xs" :count="likes">
            <template #preffix>
              <i class="pi pi-heart-fill"></i>
            </template>
          </Stat>
          <Stat class="text-surface-500 text-xs" :count="comments">
            <template #preffix>
              <i class="pi pi-comments"></i>
            </template>
          </Stat>
        </div>
      </div>
    </article>
</template>

<script setup lang="ts">
import type { PostType } from '@/types/index'

const Stat = resolveComponent('Stat')

const props = defineProps<PostType>()

const avatarUrl = computed(() => getImageNoCache(props?.profile?.avatarUrl))
</script>