import type { PostType, Profile } from "~/types"

export function usePostUsers(profile: Ref<Profile>) {

  const services = useServices()
  const loading = ref<boolean>(true)

  const posts = ref<PostType[]>([])
  const postsLiked = ref<PostType[]>([])

  const getPostsByUser = async (username: string) => {
    try {
      loading.value = true
  
      posts.value = await services.post.getPostsByUsername(username)
  
      loading.value = false
    } catch (error) {
      loading.value = false
    }
  }

  const getPostsByLiked = async (profileId: string) => {
    try {
      console.log(profileId);
      loading.value = true
  
      postsLiked.value = await services.post.getPostsByLiked(profileId)
  
      loading.value = false
    } catch (error) {
      loading.value = false
    }
  }

  watch(
    () => profile.value.id, 
    () => {
      getPostsByUser(profile.value.username)
      getPostsByLiked(profile.value.id)
    }
  )
  

  return {
    loading,
    posts,
    postsLiked,
    getPostsByUser,
    getPostsByLiked
  }
}