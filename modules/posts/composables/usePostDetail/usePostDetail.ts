import type { PostDetail } from "@/types/index"
import { myselfKey, type MyselfContextProvider } from '@/modules/users/composables/useMyself/useMyself'

interface UsePostDetailProps {
  username: string, 
  code: string
}

export function usePostDetail({ username, code }: UsePostDetailProps) {

  const { user } = inject(myselfKey) as MyselfContextProvider

  const services = useServices()
  const loading = ref<boolean>(false)
  const post = reactive<PostDetail>({
    id: '',
    title: '',
    description: null,
    coverImageUrl: '',
    code: '',
    createdAt: new Date(),
    isDraft: false,
    likes: 0,
    profile: {},
    liked: false,
  })

  const getPost = async () => {
    try {
      loading.value = true
  
      await sleep(500)
  
      const data = await services.post.getRpcPostByCode({username, code, userId: user.value.id})
  
      Object.assign(post, data)
  
      loading.value = false
    } catch (error) {
      loading.value = false    
    }
  }

  onMounted(() => {
    getPost()
  })

  return {
    loading,
    post,
    getPost
  }
}