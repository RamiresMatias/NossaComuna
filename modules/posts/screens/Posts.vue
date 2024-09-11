<template>
  <div class="grid grid-cols-12 w-full gap-4 mx-auto items-start px-4 pt-1 pb-8 2xl:px-0 relative mb-4 box-border">
    <div class="col-span-full flex w-full">
      <IconField class="w-full" icon-position="left">
        <InputIcon v-if="loading" class="pi pi-spin pi-spinner" />
        <InputIcon v-else class="pi pi-search" />
        <InputText 
          v-model="filters.search" 
          type="text" 
          placeholder="Pesquise por um post" 
        ></InputText>
      </IconField>
    </div>
    <div v-if="!loading && !posts?.length" class="col-span-full flex flex-col items-center justify-center gap-4">
      <CharactersListEmpty class="w-[400px]" />
      <h2 v-if="filters.search?.trim?.()" class="text-xl text-center ">Ops... Não encontramos nenhum post, que tal procurar por outro título</h2>
      <h2 v-else class="text-xl text-center ">Ops... Não há nenhum post criado. Crie um post agora mesmo e compartilhe seus pensamentos</h2>
    </div>
    <div class="sm:col-span-8 order-2 sm:order-1 col-span-full flex flex-col gap-4 w-full">
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
      <!-- <PostSkeleton 
        v-if="loading || loadingMore"
        v-for="item in 6"
        :key="item"
        class="sm:col-span-8 col-span-full"
      /> -->
    </div>
    <div v-if="posts.length > 0" class="sticky top-2 sm:col-span-4 col-span-full order-1 sm:order-2 bg-white flex flex-col gap-2 rounded-md p-3 w-full">
      <h3>Top tags</h3>
      <!-- <div v-if="loadingTags" class="flex gap-2 items-center flex-wrap">
        <Skeleton v-for="item in 5" :key="`skeleton-${item}`" width="6rem" height="1.5rem"></Skeleton>
      </div> -->
      <div class="flex gap-2 items-center flex-wrap">
        <Tag 
          v-for="tag in tags" 
          :key="tag.id"
          class="flex gap-2 items-center cursor-pointer transition-all text-xs" 
          severity="secondary"
          :class="{
            'bg-primary-300': filters.tags.includes(tag.id),
            'hover:bg-neutral-200 bg-neutral-100 ': !filters.tags.includes(tag.id)
          }"
          @click="selectTag(tag.id)"
        >
          <span 
            :class="{
              'text-neutral-100': filters.tags.includes(tag.id),
              'text-gray-600 ': !filters.tags.includes(tag.id)
            }"
          >{{ tag.description }}</span>
          <i
            v-if="filters.tags.includes(tag.id)"
            class="pi pi-times cursor-pointer text-neutral-100 hover:text-red-600 flex items-center justify-center rounded-full
            transition-all"
          ></i>
        </Tag>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const Post = resolveComponent('Post')
const PostSkeleton = resolveComponent('PostSkeleton')

import { useTag } from '@/modules/tag/composables/useTag/useTag'
import { useScrollBody } from '@/composables/useScrollBody/useScrollBody'
import { usePostList } from '@/modules/posts/composables/usePostList/usePostList'

const containerContentRef = inject<Ref<HTMLDivElement>>('containerContentRef')
const loadingMore = ref<boolean>(false)

const { scrollEnd } = useScrollBody(containerContentRef)
const { list: tags, loading: loadingTags } = useTag()

const { filters, posts, loading, canFetchMore, getPostList, getListLazy } = usePostList()

watch(scrollEnd, (nVal, oVal) => {
  if (nVal && !oVal && !loading.value) {
    onScroll()
  }
})

const getRequestLazy = debounce(() => getListLazy(), 2000)

watch(filters, () => {
  getRequestLazy()
}, {
  deep: true
})

const selectTag = (id: string) => {
  const idx = filters.tags.findIndex(el => el === id)
  idx >= 0 
    ? filters.tags.splice(idx, 1)
    : filters.tags.push(id)
}

const onScroll = async () => {
  if (!canFetchMore.value) return
  loadingMore.value = true
  await getPostList()
  loadingMore.value = false
}

useHead({
  title: '👨‍💻 NossaComuna - Posts'
})

useSeoMeta({
  title: '👨‍💻 NossaComuna - Posts',
  ogTitle: '👨‍💻 NossaComuna - Posts',
  description: 'Visualize, curta e interaja os posts criados por outros autores',
  ogDescription: 'Visualize, curta e interaja os posts criados por outros autores'
})

</script>