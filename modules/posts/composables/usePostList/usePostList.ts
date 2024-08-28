import type { FilterPostListProps, PostType } from "@/types"

export function usePostList() {

  const PAGE_COUNT = 6
  const page = ref<number>(0)

  const from = computed(() => page.value * PAGE_COUNT)
  const to = computed(() => from.value + PAGE_COUNT - 1)

  const services = useServices()
  const loading = ref<boolean>(false)

  const posts = ref<PostType[]>([])
  const total = ref<number>(0)

  const filters = reactive<FilterPostListProps>({
    tags: [],
    search: ''
  })

  const getPostList = async () => {
    const canFetchMore = total.value > posts.value.length

    if ((!canFetchMore && total.value !== 0) || loading.value) return

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
    getPostList,
    getListLazy,
  }
}