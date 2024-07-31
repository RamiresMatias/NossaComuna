<template>
  <section class="grid grid-cols-12 gap-x-2 px-4">
    <div class="lg:col-span-3 col-span-full">
      <div class="flex flex-col items-center gap-2 bg-white lg:rounded-md rounded-t-md p-4 shadow-md w-full">
        <Avatar :image="profile.avatarUrl" shape="circle" size="xlarge" class="w-28 h-28" />
        <span class="text-lg font-semibold">{{ profile.username }}</span>
        <span class="font-medium text-slate-500 text-lg mb-4">0 seguidores</span>
        <span class="font-medium text-slate-500 text-sm">{{ profile.bio }}</span>
      </div>
    </div>
    <div class="lg:col-span-9 col-span-full bg-white lg:rounded-md rounded-b-md shadow-md flex flex-col gap-2 p-1">
      <TabMenu :model="items" v-model:activeIndex="activeSelect" />
      <Post
        v-if="activeSelect === 0"
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
        class="shadow-none"
      />
      <AboutDetails 
        v-if="activeSelect === 1"
        :bio="profile.bio"
        :followers="5"
        :following="[]"
        :created-at="profile.createdAt"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PostType, Profile } from '@/types'

import Post from '@/modules/posts/components/Post.vue'
import AboutDetails from '@/modules/users/components/AboutDetails.vue'
import PostSkeleton from '@/modules/posts/components/PostSkeleton.vue'


const services = useServices()
const route = useRoute()

const activeSelect = ref(0)

const items = ref([
  { label: 'Posts', icon: 'pi pi-book' },
  { label: 'Sobre', icon: 'pi pi-user' },
  { label: 'Curtidas', icon: 'pi pi-heart' },
]);

const profile = reactive<Profile>({
  avatarUrl: 'http://127.0.0.1:54321/storage/v1/object/public/avatars/bd6a03fa-ebc1-4f59-9e8d-c77a30aa6d73/bd6a03fa-ebc1-4f59-9e8d-c77a30aa6d73',
  bio: 'Software Developer',
  email: 'teste@teste.com.br',
  id: '',
  username: 'Usuário teste',
  createdAt: new Date()
})

const loading = ref(false)

const posts = ref<PostType[]>([])

const loadPosts = async () => {
  try {
    const username = route.params.username as string
    loading.value = true

    posts.value = await services.post.getPostsByUsername({username})

    setTimeout(() => {
      loading.value = false
    }, 1000)
  } catch (error) {
    loading.value = false
  }
}

const getProfileDetails = async () => {
  const username = route.params.username as string

  if (!username) {
    return navigateTo('/404')
  }
  try {
    loading.value = true
    const data = await services.users.getUserByUsername(username)
    Object.assign(profile, data)

    await sleep(1000)

    loading.value = false
  } catch (error) {
    console.log(error);
    loading.value = false
  }
}

onMounted(() => {
  getProfileDetails()
  loadPosts()
})
</script>

<style scoped>

</style>