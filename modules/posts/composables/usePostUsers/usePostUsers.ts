import type { PostType } from "~/types"

export function usePostUsers(username: string) {

  const services = useServices()
  const loading = ref<boolean>(true)

  const posts = ref<PostType[]>([])

  const getPostsByUser = async () => {
    try {
      loading.value = true
  
      posts.value = await services.post.getPostsByUsername(username)
  
      await sleep(1000)

      loading.value = false
    } catch (error) {
      loading.value = false
    }
  }

  onMounted(() => {
    getPostsByUser()
  })

  return {
    loading,
    posts,
    getPostsByUser
  }
}