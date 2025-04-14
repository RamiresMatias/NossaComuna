<template>
  <div class="grid grid-cols-12 w-full gap-4 mx-auto items-start pt-1 pb-8 2xl:px-0 relative mb-4 box-border">
    <div v-if="!loading && !posts?.length && !hasFilters" class="col-span-full flex flex-col items-center justify-center gap-4">
      <CharactersListEmpty class="w-[400px]" />
      <h2 v-if="filters.search?.trim?.()" class="text-xl text-center ">Ops... Não encontramos nenhum post, que tal procurar por outro título</h2>
      <h2 v-else class="text-xl text-center ">Ops... Não há nenhum post criado. Crie um post agora mesmo e compartilhe seus conhecimentos</h2>
    </div>
    <div class="col-span-full lg:col-start-4 lg:col-end-10 lg:px-0 px-2 flex flex-col gap-4">
      <Post
        v-if="!loading || posts.length"
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
      />
      <div v-if="posts.length === 0 && hasFilters && !loading" class="text-xl text-center bg-white p-4 rounded-md shadow-sm">
        Ops... Nenhum post encontrado, tente alterar o filtro para trazer outros resultados.
      </div>
      <PostSkeleton 
        v-if="loading"
        v-for="item in 2"
        :key="item"
        class="sm:col-span-8 col-span-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScrollBody } from '@/composables/useScrollBody/useScrollBody'
import { usePostList } from '@/modules/posts/composables/usePostList/usePostList'

const containerContentRef = inject<Ref<HTMLDivElement>>('containerContentRef')
  
const { scrollEnd } = useScrollBody(containerContentRef)

const { filters, canFetchMore, resetPagination, getPostList, setLoading, loading: loadingRequest } = usePostList()

const { data: postsServer, status, refresh } = useAsyncData('posts', async () => {
  return getPostList()
})

const loading = computed(() => status.value === 'pending' || loadingRequest.value)
const posts = computed(() => postsServer.value || [])

watch(scrollEnd, (nVal, oVal) => {
  if (nVal && !oVal && !loading.value) {
    onScroll()
  }
})

prerenderRoutes((postsServer.value || []).map(post => `/${post.profile.username}/${post.code}`))

const getRequestLazy = debounce(() => {
  resetPagination()
  refresh()
}, 2000)

watch(filters, () => {
  canFetchMore.value = true
  setLoading(true)
  getRequestLazy()
}, {
  deep: true
})

const hasFilters = computed(() => !!filters.search || filters.tags.length > 0)

const onScroll = async () => {
  if (!canFetchMore.value) return
  refresh()
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