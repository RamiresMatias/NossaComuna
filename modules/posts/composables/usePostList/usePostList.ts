import type { FilterPostListProps, PostType } from "@/types"

export function usePostList() {

  const services = useServices()

  const PAGE_COUNT = 6
  const page = ref<number>(0)

  const loading = ref<boolean>(false)
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
  
      const data = await services.post.getAllPosts({ 
        from: from.value, 
        to: to.value,
        filters: { ...filters }
      })

      console.log({data});
      // page.value += 0
      posts.value.push(...data)
      // total.value = data.length
      // canFetchMore.value = posts.value.length !== data.length
  
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
    from,
    to,
    canFetchMore,
    getPostList,
    getListLazy,
  }
}