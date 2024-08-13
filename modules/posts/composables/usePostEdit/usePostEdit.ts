import type { EditPostType } from "@/types/index"
import { myselfKey, type MyselfContextProvider } from '@/modules/users/composables/useMyself/useMyself'

import {z, type ZodFormattedError} from 'zod'

const schema = z.object({
  title: z.string().min(2, 'Título é obrigatório'),
  description: z.string().min(10, 'A descrição é obrigatória'),
})

export function usePostEdit(id: string) {

  const { user } = inject(myselfKey) as MyselfContextProvider

  const services = useServices()
  const toast = useToast()
  const loading = ref<boolean>(true)
  const errors = ref<ZodFormattedError<EditPostType>>()
  const form = reactive<EditPostType>({
    id: '',
    code: '',
    coverImage: null,
    title: '',
    isDraft: false,
    description: '',
    coverImageUrl: ''
  })

  const validateForm = () => {
    const result = schema.safeParse({...form})
    if(!result.success) {
      errors.value = result.error.format()
    }

    return result
  }


  const update = async () => {
    try {

      if (!user.value.id) throw new Error ("É necessário estar logado para criar um form")
      if (!form.id) throw new Error ("Informe o ID do post")

      loading.value = true
  
      await services.post.editPost({
        id: form.id,
        title: form.title,
        description: form.description,
        coverImage: form.coverImage,
        isDraft: form.isDraft,
        profileId: user.value.id,
        coverImageUrl: form.coverImageUrl
      })

      toast.add({
        severity: 'success',
        summary: 'Sucesso!',
        detail: 'Post atualizado com sucesso',
        life: 2000
      })
  
      await sleep(1000)
      loading.value = false
      navigateTo(`/${user.value.username}/${form.code}`)
    } catch (error) {
      loading.value = false
    }
  }

  const getPostById = async () => {

    if (!id || !user.value?.id) return

    try {
      loading.value = true
      
      const postFound = await services.post.getPostByIdAndAuthor({id, userId: user.value?.id})

      if (!postFound) {
        return toast.add({
          severity: 'warn',
          summary: 'Ops!',
          detail: 'Post não encontrado',
          life: 2000
        })
      }

      Object.assign(form, postFound)

      await sleep(1000)
      loading.value = false
    } catch (error) {
      loading.value = false
    }
  }

    watch(
      () => user.value,
      (nVal) => {
        nVal && getPostById()
      },
      {immediate: true }
    )

  onMounted(() => {
    getPostById()
  })

  return {
    loading,
    form,
    errors,
    update,
    validateForm
  }
}