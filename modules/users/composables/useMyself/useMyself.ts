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
  }

  onMounted(() => {
    // fetchUser()
  })

  return {
    loading,
    user,
    setUser,
    logout
  }
}