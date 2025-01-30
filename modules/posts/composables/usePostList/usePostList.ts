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
  
      const data = await services.post.getAllPosts({ 
        size: 10, 
        to: page.value,
        filters: { ...filters }
      })

      page.value += 10
      posts.value.push(...data)
      canFetchMore.value = posts.value.length !== data.length
  
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