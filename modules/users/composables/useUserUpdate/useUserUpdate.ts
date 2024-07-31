import type { Profile, User } from "@/types/index"

interface UseUserUpdateOptions {
  user: Ref<User | undefined>
}

export function useUserUpdate({user}: UseUserUpdateOptions) {

  const services = useServices()
  const toast = useToast()
  const loading = ref<boolean>(true)
  const form = reactive<Profile>({
    id: '',
    avatarUrl: '',
    email: '',
    username: '',
    bio: '',
    createdAt: new Date(),
    avatar: null
  })

  const update = async () => {
    try {
      if (!form.id) return
      loading.value = true

      await services.users.update(form.id, {
        username: form.username || '',
        bio: form.bio,
        avatar: form.avatar,
        avatarUrl: form.avatarUrl
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
    update,
  }
}