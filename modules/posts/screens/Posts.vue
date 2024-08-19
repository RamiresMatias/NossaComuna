<template>
  <div class="grid grid-cols-12 w-full h-full gap-4 mx-auto items-start px-4 py-1 2xl:p-0 relative">
    <PostSkeleton 
      v-if="status === 'pending'"
      v-for="item in 4"
      :key="item"
      class="sm:col-span-8 col-span-full"
    />
    <div v-if="loadingTags" class="sm:col-span-4 col-span-full bg-white flex flex-col gap-2 rounded-md p-3 w-full">
      <Skeleton width="12rem" height="1rem"></Skeleton>
      <div class="flex gap-2 items-center flex-wrap">
        <Skeleton v-for="item in 5" :key="`skeleton-${item}`" width="6rem" height="1.5rem"></Skeleton>
      </div>
    </div>
    <div v-else-if="status === 'success' && !posts?.length" class="col-span-full flex flex-col items-center justify-center gap-4">
      <CharactersListEmpty class="w-[400px]" />
      <h2 class="text-xl text-center ">Ops... Não há nenhum post criado. Crie um post agora mesmo e compartilhe seus pensamentos</h2>
    </div>
    <div v-else-if="status === 'success' && posts?.length" class="sm:col-span-8 order-2 sm:order-1 col-span-full flex flex-col gap-4 w-full">
      <Post
        v-for="(item, i) in posts" 
        :key="i"
        :id="item.id"
        :code="item.code"
        :cover-image="item.coverImage"
        :created-at="item.createdAt"
        :is-draft="item.isDraft"
        :title="item.title"
        :profile="item.profile"
        :total-comments="item.totalComments"
        :likes="item.likes"
        :tags="item.tags"
      />
    </div>
    <div v-if="posts?.length && tags.length && !loadingTags" class="sticky top-2 sm:col-span-4 col-span-full order-1 sm:order-2 bg-white flex flex-col gap-2 rounded-md p-3 w-full">
      <h3>Top tags</h3>
      <div class="flex gap-2 items-center flex-wrap">
        <Tag 
          v-for="tag in tags" 
          :key="tag.id"
          class="flex gap-2 items-center cursor-pointer transition-all text-xs" 
          severity="secondary"
          :class="{
            'bg-primary-300': selectedTags.includes(tag.id),
            'hover:bg-neutral-200 bg-neutral-100 ': !selectedTags.includes(tag.id)
          }"
          @click="selectTag(tag.id)"
        >
          <span 
            :class="{
              'text-neutral-100': selectedTags.includes(tag.id),
              'text-gray-600 ': !selectedTags.includes(tag.id)
            }"
          >{{ tag.description }}</span>
          <i
            v-if="selectedTags.includes(tag.id)"
            class="pi pi-times cursor-pointer text-neutral-100 hover:text-red-600 flex items-center justify-center rounded-full
            transition-all"
          ></i>
        </Tag>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Post from '@/modules/posts/components/Post.vue'
import PostSkeleton from '@/modules/posts/components/PostSkeleton.vue'

import { useTag } from '@/modules/tag/composables/useTag/useTag'

const services = useServices()

const selectedTags = ref<string[]>([])

const PAGE_COUNT = 6
const page = ref<number>(0)

const from = computed(() => page.value * PAGE_COUNT)
const to = computed(() => from.value + PAGE_COUNT - 1)

const { status, data: posts, execute } = await useLazyAsyncData('posts', () => {
  return services.post.getAllPosts({ from: from.value, to: to.value })
})

const { list: tags, loading: loadingTags } = useTag()

const selectTag = (id: string) => {
  const idx = selectedTags.value.findIndex(el => el === id)
  idx >= 0 
    ? selectedTags.value.splice(idx, 1)
    : selectedTags.value.push(id)
}

const onScroll = () => {
  page.value += 1
  execute()
}

useSeoMeta({
  title: 'Posts',
  ogTitle: 'Posts',
  description: 'Leia, crie e compartilhe conhecimento em nossa comunidade',
  ogDescription: 'Leia, crie e compartilhe conhecimento em nossa comunidade'
})

</script>