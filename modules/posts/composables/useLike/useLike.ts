import type { PostDetail } from "@/types/index"
import { myselfKey, type MyselfContextProvider } from '@/modules/users/composables/useMyself/useMyself'

export function useLike(post: Ref<PostDetail>) {

  const { user } = inject(myselfKey) as MyselfContextProvider

  const services = useServices()
  const loading = ref<boolean>(false)

  const likePost = async () => {
    try {
      await services.post.like({
        postId: post.value.id, 
        profileId: user.value.id, 
        commentId: null
      })
  
      post.value.liked = !post.value.liked
      post.value.likes += 1
    } catch (error) {
      console.log(error);
    }
  }

  const deslikePost = async () => {
    try {
      await services.post.deslike({postId: post.value.id, profileId: user.value.id, commentId: null})
  
      post.value.liked = !post.value.liked
      post.value.likes -= 1
    } catch (error) {
      console.log(error);
    }
  }

  return {
    loading,
    likePost,
    deslikePost,
  }
}