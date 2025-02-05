import type { FilterPostListProps, PostType } from "@/types"

export function usePostList() {

  const services = useServices()

  const page = ref<number>(0)

  const loading = ref<boolean>(false)
  const posts = ref<PostType[]>([])
  const total = ref<number>(0)
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

  const getListLazy = () => {
    page.value = 0
    posts.value = []
    total.value = 0

    getPostList()
  }

  const setPage = (num: number) => page.value = num


  return {
    loading,
    posts,
    filters,
    canFetchMore,
    page,
    getPostList,
    getListLazy,
    setPage
  }
}