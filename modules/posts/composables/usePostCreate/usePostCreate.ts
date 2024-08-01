import type { CreatePostType, User } from "@/types/index"
import { myselfKey, type MyselfContextProvider } from '@/modules/users/composables/useMyself/useMyself'

export function usePostCreate() {

  const { user } = inject(myselfKey) as MyselfContextProvider

  const services = useServices()
  const toast = useToast()
  const loading = ref<boolean>(false)
  const form = reactive<CreatePostType>({
    coverImage: null,
    title: '',
    isDraft: false,
    description: {
      blocks: [],
      time: 0,
      version: ''
    }
  })

  const create = async () => {
    try {
      loading.value = true
  
      await services.post.createPost({
        title: form.title,
        description: form.description,
        coverImage: form.coverImage,
        isDraft: form.isDraft,
        profileId: user.value.id
      })

      toast.add({
        severity: 'success',
        summary: 'Sucesso!',
        detail: 'Post cadastrado com sucesso',
        life: 2000
      })
  
      await sleep(1000)
      loading.value = false
      navigateTo('/posts')
    } catch (error) {
      loading.value = false
    }
  }

  return {
    loading,
    form,
    create,
  }
}