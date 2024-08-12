import type { CreatePostType, User } from "@/types/index"
import { myselfKey, type MyselfContextProvider } from '@/modules/users/composables/useMyself/useMyself'
import { v4 } from "uuid"

export function usePostCreate() {

  const { user } = inject(myselfKey) as MyselfContextProvider

  const services = useServices()
  const toast = useToast()
  const loading = ref<boolean>(false)
  const form = reactive<CreatePostType>({
    coverImage: null,
    title: '',
    isDraft: false,
    description: ''
  })

  const create = async () => {
    try {
      loading.value = false

      const id = v4()
  
      await services.post.createPost({
        id,
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