import type { PostDetail, Profile } from "@/types"

export function useAuthor(post: Ref<PostDetail>) {

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
    if (!post.value?.profile?.id) return
    try {
      loading.value = true
      const data = await services.users.getUserById(post.value.profile.id)
      Object.assign(author, data)
  
      loading.value = false
    } catch (error) {
      loading.value = false
      console.log(error);
    }
  }

  watchEffect(() => {
    if (post.value?.id) getProfileAuthor()
  })

  return {
    loading,
    author,
    getProfileAuthor
  }
}