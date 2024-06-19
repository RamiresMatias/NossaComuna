import type { User } from "@/types/index"
import {useSession} from '@/modules/auth/composables/useSession/useSession'
import type { InjectionKey } from "vue"

export interface MyselfContextProvider {
  user: Ref<User | undefined>
  loading: Ref<boolean>
}

export const myselfKey = Symbol('myself')as InjectionKey<MyselfContextProvider> 

export function useMyself() {
  const services = useServices()
  const session = useSession()
  const loading = ref<boolean>(true)
  const user = ref<User>()

  provide<MyselfContextProvider>(myselfKey, { user, loading })

  const fetchUser = async () => {
    loading.value = true
    try {
      
      const response = await services.users.getMySelf(session.user.value?.id!)
      if(!response) return
      user.value = response
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchUser()
  })

  return {
    loading,
    user,
    fetchUser
  }
}