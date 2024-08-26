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
      <PostSkeleton 
        v-if="activeSelect === 0 && loadingPosts"
        v-for="item in 4"
        :key="item"
      />
      <Post
        v-if="activeSelect === 0 && !loadingPosts"
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
import Post from '@/modules/posts/components/Post.vue'
import AboutDetails from '@/modules/users/components/AboutDetails.vue'
import PostSkeleton from '@/modules/posts/components/PostSkeleton.vue'

import { useProfileDetails } from '@/modules/users/composables/useProfileDetails/useProfileDetails'
import { usePostUsers } from '@/modules/posts/composables/usePostUsers/usePostUsers'

const route = useRoute()

const { profile, loading } = useProfileDetails((route.params.username as string))
const { posts, loading: loadingPosts } = usePostUsers((route.params.username as string))

const activeSelect = ref(0)

const items = ref([
  { label: 'Posts', icon: 'pi pi-book' },
  { label: 'Sobre', icon: 'pi pi-user' },
  { label: 'Curtidas', icon: 'pi pi-heart' },
]);
</script>

<style scoped>

</style>