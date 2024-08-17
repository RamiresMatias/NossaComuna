import type { PostDetail, Profile } from "@/types"

export function useAuthor(post: PostDetail) {

  const services = useServices()
  const loading = ref<boolean>(false)

  const author = reactive<Profile>({
    id: '',
    createdAt: null,
    email: '',
    avatarUrl: '',
    bio: '',
    username: ''
  })
 
  const getProfileAuthor = async () => {
    if (!post?.profile?.id) return
    try {
      loading.value = true
      const data = await services.users.getUserById(post.profile.id)
      Object.assign(author, data)
  
      loading.value = false
    } catch (error) {
      loading.value = false
      console.log(error);
    }
  }

  watchEffect(() => {
    if (post?.id) getProfileAuthor()
  })

  return {
    loading,
    author,
    getProfileAuthor
  }
}