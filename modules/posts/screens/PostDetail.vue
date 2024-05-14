<template>
  <article class="w-full h-full mx-auto max-w-3xl bg-white rounded-md flex flex-col">
    <img :src="props.coverImage" alt="Imagem de capa do post" class="w-full h-full max-h-[400px] object-cover rounded-t-md mb-8" />
    <section class="w-full h-full flex flex-col max-w-[80%] mx-auto">
      <div class="flex w-full py-4 gap-2">
        <img :src="profile?.avatarUrl" alt="Foto de perfil do usuário" class="rounded-full w-12 h-12" />
        <div class="w-full h-full flex flex-col flex-1 gap-1">
          <p class=" text-base lg:text-lg text-[--title-color] font-[700] text-balance font-[Inter]">
            {{ profile?.username || profile?.name }}
          </p>
          <p class="text-xs font-[Inter] font-regular text-gray-500">
            Postado em {{ new Date(createdAt).toLocaleDateString('pt-br') }}
          </p>
        </div>
      </div>
      <div class="w-full flex gap-4 mb-10">
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
      <h1 class="text-5xl font-bold text-pretty tracking-wide	mb-10">
        {{ props.title }}
      </h1>
      <p class="text-xl leading-6 text-pretty text-left mb-10">
        {{ props.description }}
      </p>
    </section>
  </article>
</template>

<script setup lang="ts">
import Stat from '@/modules/posts/components/Stat.vue'
import { onMounted } from 'vue'
import type { Post } from '@/types'


const props = withDefaults(
  defineProps<Post>(),
  {
    id: 'sdafdsafasd',
    title: 'What are you learning about this weekend? 🧠',
    description: `Hey hey hey!

    Hope you're having a nice productive weekend while also finding time to relax. 😎

    Whether you're sharpening your JS skills, making PRs to your OSS repo of choice 😉, sprucing up your portfolio, writing a new post here on DEV, or just straight chillin', we'd like to hear about it.

    Be kind to your mind and remember to unwind. 🧘`,
    coverImage: 'https://i.ibb.co/7j0h56g/imagem-de-teste.png',
    code: 'what-are-you-learning-about-this-weekend-1nn8',
    createdAt: () => new Date(),
    isDraft: false,
    totalLikes: 0,
    totalComments: 0,
    profile: () => Object.create({username: 'Klebin', avatarUrl: 'https://i.ibb.co/VwpJcdH/1ca5d6cede414702a3fd2eeb12bb68b8.jpg'})
  }
)

const route = useRoute()

const getPost = async () => {
  const { username, post } = route.params as {username: string, post: string}
}

onMounted(() => getPost())
</script>