import type { FilterPostListProps, PostType } from "@/types"

export function usePostList() {

  const services = useServices()

  const page = ref<number>(0)

  const loading = ref<boolean>(false)
  const posts = ref<PostType[]>([])
  const filters = reactive<FilterPostListProps>({
    tags: [],
    search: ''
  })
  const canFetchMore = ref<boolean>(true)

  const getPostList = async () => {
    if (!canFetchMore.value) return

    try {
      loading.value = true
  
      const { totalItems, items } = await services.post.getAllPosts({ 
        size: 6, 
        to: page.value,
        filters: { ...filters }
      })

      page.value += 6
      posts.value.push(...items)
      canFetchMore.value = posts.value.length < totalItems
  
      loading.value = false
      return posts.value
    } catch (error) {
      loading.value = false
    }
  }

  const resetPagination = () => {
    page.value = 0
    posts.value = []
  }

  const setPage = (num: number) => page.value = num
  const setLoading = (value: boolean) => loading.value = value


  return {
    loading,
    posts,
    filters,
    canFetchMore,
    page,
    getPostList,
    resetPagination,
    setPage,
    setLoading
  }
}