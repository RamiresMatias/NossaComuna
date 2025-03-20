import { myselfKey, type MyselfContextProvider } from "~/modules/users/composables/useMyself/useMyself"
import type { PostDetail } from "~/types"

export function usePostDetail(post: Ref<PostDetail>) {

  const { user } = inject(myselfKey) as MyselfContextProvider

  const services = useServices()
  const loading = ref<boolean>(true)
  const isAuthor = ref<boolean>(false)

  const getIsAuthorPost = async () => {
    try {
      if (!user.value?.id) {
        isAuthor.value = false
        return false
      }

      loading.value = true
    
      isAuthor.value = await services.post.isAuthorPost(post.value.id)

      loading.value = false
    } catch (error) {
      loading.value = false    
    }
  }

  watchEffect(() => {
    if (post.value.id) {
      getIsAuthorPost()
    }
  })

  return {
    loading,
    isAuthor,
    getIsAuthorPost
  }
}