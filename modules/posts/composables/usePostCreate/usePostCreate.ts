import type { CreatePostType } from "@/types/index"
import { v4 } from "uuid"
import {z, type ZodFormattedError} from 'zod'

import { useMyself } from '@/modules/users/composables/useMyself/useMyself'

import { usePostTag } from '@/modules/tag/composables/usePostTag/usePostTag'


const schema = z.object({
  title: z.string().min(2, 'Título é obrigatório'),
  description: z.string().min(10, 'A descrição é obrigatória'),
  tags: z.object({}).array().nonempty('É necessário inserir ao menos uma tag')
})

export function usePostCreate() {

  const { user } = useMyself()
  const services = useServices()
  const toast = useToast()
  const loading = ref<boolean>(false)
  const errors = ref<ZodFormattedError<CreatePostType>>()
  const form = reactive<CreatePostType>({
    coverImage: null,
    title: '',
    isDraft: false,
    content: '',
    tags: [],
    code: ''
  })

  const { bindTagsInPost } = usePostTag()

  const validateForm = () => {
    const result = schema.safeParse({...form})
    if(!result.success) {
      errors.value = result.error.format()
    }

    return result
  }

  const create = async () => {
    try {
      loading.value = false
  
      const response = await services.post.createPost({
        title: form.title,
        content: form.content,
        coverImage: form.coverImage,
        isDraft: form.isDraft,
        profileId: user.value.id,
        tags: form.tags,
        code: removeAccents(transformCode(form.title))
      })

      // if (!error) {
      //   await bindTagsInPost({ postId: id, tags: form.tags })
      // }

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
    errors,
    create,
    validateForm,
  }
}