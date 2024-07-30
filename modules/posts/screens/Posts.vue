<template>
  <div class="flex flex-col w-full h-full gap-4 max-w-3xl mx-auto items-center">
    <PostSkeleton 
      v-if="loading"
      v-for="item in 4"
      :key="item"
    />
    <div v-else-if="!loading && !posts?.length" class="flex flex-col items-center justify-center gap-4">
      <CharactersListEmpty class="w-[400px]" />
      <h2 class="text-xl text-center ">Ops... Não há nenhum post criado. Crie um post agora mesmo e compartilhe seus pensamentos</h2>
    </div>
    <Post
      v-else
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
    />
  </div>
</template>

<script setup lang="ts">
import Post from '@/modules/posts/components/Post.vue'
import PostSkeleton from '@/modules/posts/components/PostSkeleton.vue'

import type { PostType } from '@/types'

const services = useServices()

const loading = ref(false)
const posts = ref<PostType[]>()

const loadPosts = async () => {
  try {
    loading.value = true

    posts.value = await services.post.getAllPosts()

    setTimeout(() => {
      loading.value = false
    }, 1000)
  } catch (error) {
    loading.value = false
  }
}

useSeoMeta({
  title: `Posts`,
  ogTitle: `Posts`,
  description: `Leia, crie e compartilhe conhecimento em nossa comunidade`,
  ogDescription: `Leia, crie e compartilhe conhecimento em nossa comunidade`
})

onMounted(() => loadPosts())
</script>