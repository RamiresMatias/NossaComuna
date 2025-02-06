<template>
  <section class="grid grid-cols-12 gap-x-2 px-4">
    <div v-if="loading" class="lg:col-span-3 col-span-full">
      <div class="flex flex-col items-center gap-2 bg-white lg:rounded-md rounded-t-md p-4 shadow-md w-full">
        <Skeleton width="7rem" height="7rem" shape="circle"></Skeleton>
        <Skeleton width="4rem" height="1rem"></Skeleton>
        <Skeleton width="4rem" height="1rem"></Skeleton>
        <Skeleton width="8rem" height="2rem"></Skeleton>
      </div>
    </div>
    <div v-else class="lg:col-span-3 col-span-full">
      <div class="flex flex-col items-center gap-2 bg-white lg:rounded-md rounded-t-md p-4 shadow-md w-full">
        <Avatar :image="profile.avatarUrl" shape="circle" size="xlarge" class="w-28 h-28" alt="Avatar do perfil do autor" />
        <span class="text-lg font-semibold">{{ profile.username }}</span>
        <span class="font-medium text-slate-500 text-lg">0 seguidores</span>
        <span class="font-medium text-slate-500 text-sm">{{ profile.bio }}</span>
      </div>
    </div>
    <div class="lg:col-span-9 col-span-full bg-white lg:rounded-md rounded-b-md shadow-md flex flex-col gap-2 p-1">
      <TabMenu :model="items" v-model:activeIndex="activeSelect" />
      <PostSkeleton 
        v-if="activeSelect === 0 && loadingPosts"
        v-for="item in 2"
        :key="item"
      />
      <Post
        v-if="activeSelect === 0 && !loadingPosts && posts.length"
        v-for="(item, i) in posts" 
        :key="i"
        :id="item.id"
        :code="item.code"
        :cover-image="item.coverImage"
        :created-at="item.createdAt"
        :is-draft="item.isDraft"
        :title="item.title"
        :profile="item.profile"
        :comments="item.comments"
        :likes="item.likes"
        :tags="item.tags"
        class="shadow-none"
      />
      <p v-if="activeSelect === 0 && !loadingPosts && !posts.length" class="text-lg text-center my-auto">
        Esse usuário naõ possui nenhum post 😕
      </p>
      <AboutDetails 
        v-if="activeSelect === 1"
        :bio="profile.bio"
        :followers="5"
        :following="[]"
        :created-at="profile.createdAt"
      />
      <Post
        v-if="activeSelect === 2"
        v-for="(item, i) in postsLiked" 
        :key="i"
        :id="item.id"
        :code="item.code"
        :cover-image="item.coverImage"
        :created-at="item.createdAt"
        :is-draft="item.isDraft"
        :title="item.title"
        :profile="item.profile"
        :comments="item.comments"
        :likes="item.likes"
        :tags="item.tags"
        class="shadow-none"
      />
    </div>
  </section>
</template>

<script setup lang="ts">

const Post = resolveComponent('Post')
const AboutDetails = resolveComponent('AboutDetails')
const PostSkeleton = resolveComponent('PostSkeleton')

import { useProfileDetails } from '@/modules/users/composables/useProfileDetails/useProfileDetails'
import { usePostUsers } from '@/modules/posts/composables/usePostUsers/usePostUsers'

const route = useRoute()

const { getProfileDetails } = useProfileDetails((route.params.username as string))
const { data, status } = useAsyncData('profile-details', async () => {
  return getProfileDetails()
})

const loading = computed(() => status.value === 'pending')
const profile = computed(() => data.value)

const { posts, loading: loadingPosts, postsLiked } = usePostUsers(data)

const activeSelect = ref(0)

const items = ref([
  { label: 'Posts', icon: 'pi pi-book' },
  { label: 'Sobre', icon: 'pi pi-user' },
  { label: 'Curtidas', icon: 'pi pi-heart' },
]);
</script>

<style scoped>

</style>