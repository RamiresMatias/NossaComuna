import type { Profile, User } from "@/types/index"
import {z, type ZodFormattedError} from 'zod'
import { useMyself } from "../useMyself/useMyself"

interface UseUserUpdateOptions {
  user: Ref<User | undefined>
}


const schema = z.object({
  email: z.string().email('O e-mail é obrigatório'),
  username: z.string().min(4, 'O nome de usuário precisa de no mínimo 4 caracteres').regex(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/, 'Digite um nome de usuário válido'),
})


export function useUserUpdate({user}: UseUserUpdateOptions) {

  const { updateLocalUser, setUser } = useMyself()
  const services = useServices()
  const toast = useToast()
  const loading = ref<boolean>(false)
  const errors = ref<ZodFormattedError<Profile>>()

  const form = reactive<Profile>({
    id: '',
    avatarUrl: '',
    email: '',
    username: '',
    bio: '',
    createdAt: null,
    avatar: null
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
      if (!form.id) return
      loading.value = true

      const updated = await services.users.update(form.id, {
        username: form.username || '',
        bio: form.bio
      })

      let avatarUrl = ''
      if (form.avatar) {
        avatarUrl = await services.users.uploadAvatar(form.avatar, form.id)
      }

      

      setUser({
        createdAt: updated.createdAt,
        id: updated.id,
        email: updated.email,
        bio: updated.bio,
        username: updated.username,
        avatarUrl: avatarUrl || updated.avatarUrl
      })
    
      toast.add({
        severity: 'success',
        summary: 'Sucesso!',
        detail: 'Perfil atualizado com sucesso!',
        life: 2000
      })
      loading.value = false
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Ops!',
        detail: 'Ocorreu um erro ao tentar atualizar o perfil!',
        life: 2000
      })
      loading.value = false
    }
  }

  watchEffect(() => {
    if (!user.value) return
    Object.assign(form, user.value)
  })

  return {
    loading,
    form,
    errors,
    update,
    validateForm
  }
}