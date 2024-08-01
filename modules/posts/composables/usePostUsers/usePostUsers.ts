import type { PostType } from "~/types"

export function usePostUsers(username: string) {

  const services = useServices()
  const loading = ref<boolean>(true)

  const posts = ref<PostType[]>([])

  const getPostsByUser = async () => {
    try {
      loading.value = true
  
      posts.value = await services.post.getPostsByUsername({username})
  
      setTimeout(() => {
        loading.value = false
      }, 1000)
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