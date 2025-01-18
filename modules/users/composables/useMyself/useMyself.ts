import type { User } from "@/types/index"
import type { InjectionKey } from "vue"
import { useLocalStorage } from "@/composables/useLocalStorage/useLocalStorage"

export interface MyselfContextProvider {
  user: Ref<User | undefined>
  loading: Ref<boolean>
}

export const myselfKey = Symbol('myself')as InjectionKey<MyselfContextProvider> 

export function useMyself() {
  const lcStorage = useLocalStorage()
  const token = useCookie('auth-token', {
    default: () => '',
    readonly: false,
    secure: true
  })
  const services = useServices()


  const loading = ref<boolean>(false)
  const user = ref<User>({...lcStorage.getItem('user-data')})

  provide<MyselfContextProvider>(myselfKey, { user, loading })

  const setUser = async (value: User) => {
    user.value = value
    lcStorage.setItem('user-data', value)
  }

  const logout = () => {
    lcStorage.removeItem('user-data')
    token.value = ''
    navigateTo('/auth')
  }

  const updateLocalUser = async (profileId: string) => {
    try {
      const mySelf = await services.users.getMySelf(profileId)

      setUser({
        createdAt: mySelf.createdAt,
        id: mySelf.id,
        avatarUrl: mySelf.avatarUrl,
        bio: mySelf.bio,
        email: mySelf.user.email,
        username: mySelf.username
      })
    } catch (error) {
      throw error
    }
  }

  onMounted(() => {
    // fetchUser()
  })

  return {
    loading,
    user,
    setUser,
    logout,
    updateLocalUser
  }
}