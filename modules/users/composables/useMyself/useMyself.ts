import type { User } from "@/types/index"
import type { InjectionKey } from "vue"

export interface MyselfContextProvider {
  user: Ref<User | undefined>
  loading: Ref<boolean>
}

export const myselfKey = Symbol('myself')as InjectionKey<MyselfContextProvider> 

export function useMyself() {
  const token = useCookie('auth-token', {
    default: () => '',
    secure: true,
    sameSite: 'strict'
  })
  const userLogged = useCookie<User>('user-logged', {
    secure: true,
    sameSite: 'strict',
    maxAge: 21600
  })
  const services = useServices()

  const loading = ref<boolean>(true)
  const user = ref<User>({ ...userLogged.value })

  provide<MyselfContextProvider>(myselfKey, { user, loading })

  const setUser = async (value: User) => {
    user.value = value
    userLogged.value = value
  }

  const logout = () => {
    token.value = null
    userLogged.value = null
    user.value = null
    navigateTo('/auth')
  }

  const updateLocalUser = async (profileId: string) => {
    try {
      loading.value = true
      const mySelf = await services.users.getMySelf(profileId)

      setUser({
        createdAt: mySelf.createdAt,
        id: mySelf.id,
        avatarUrl: mySelf.avatarUrl,
        bio: mySelf.bio,
        email: mySelf.user.email,
        username: mySelf.username
      })
      loading.value = false
    } catch (error) {
      loading.value = false
      throw error
    }
  }

  onMounted(() => {
    loading.value = false

    if (user.value?.id && !token.value) {
      logout()
    }
  })

  return {
    loading,
    user,
    setUser,
    logout,
    updateLocalUser
  }
}