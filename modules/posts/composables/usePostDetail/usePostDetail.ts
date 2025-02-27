import type { PostDetail } from "@/types/index"
import { myselfKey, type MyselfContextProvider } from '@/modules/users/composables/useMyself/useMyself'

interface UsePostDetailProps {
  username: string, 
  code: string
}

export function usePostDetail({ username, code }: UsePostDetailProps) {

  const { user } = inject(myselfKey) as MyselfContextProvider

  const services = useServices()
  const loading = ref<boolean>(true)
  const post = reactive<PostDetail>({
    id: '',
    title: '',
    content: null,
    coverImageUrl: '',
    code: '',
    createdAt: null,
    isDraft: false,
    likes: 0,
    profile: {},
    liked: false,
  })

  const getPost = async () => {
    try {
      loading.value = true
    
      // const data = await services.post.getRpcPostByCode({username, code, userId: user.value.id})
  
      // Object.assign(post, data)
  
      loading.value = false
    } catch (error) {
      loading.value = false    
    }
  }


  return {
    loading,
    post,
    getPost
  }
}