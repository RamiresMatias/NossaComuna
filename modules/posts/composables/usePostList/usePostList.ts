import type { FilterPostListProps, PostType } from "@/types"

export function usePostList() {

  const services = useServices()

  const PAGE_COUNT = 6
  const page = ref<number>(0)

  const loading = ref<boolean>(true)
  const posts = ref<PostType[]>([])
  const total = ref<number>(0)
  const filters = reactive<FilterPostListProps>({
    tags: [],
    search: ''
  })
  const canFetchMore = ref<boolean>(true)

  const from = computed(() => page.value * PAGE_COUNT)
  const to = computed(() => from.value + PAGE_COUNT - 1)


  const getPostList = async () => {
    if (!canFetchMore.value) return

    try {
      loading.value = true
  
      const { results, total: totalPosts } = await services.post.getAllPosts({ 
        from: from.value, 
        to: to.value,
        filters: { ...filters }
      })

      page.value += 1

      posts.value.push(...results)
      total.value = totalPosts
      canFetchMore.value = posts.value.length !== totalPosts 
  
      await sleep(1000)

      loading.value = false
    } catch (error) {
      loading.value = false
    }
  }

  const getListLazy = () => {
    page.value = 0
    posts.value = []
    total.value = 0

    getPostList()
  }

  onMounted(() => {
    getPostList()
  })

  return {
    loading,
    posts,
    filters,
    canFetchMore,
    getPostList,
    getListLazy,
  }
}