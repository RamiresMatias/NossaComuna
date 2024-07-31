import type { User } from "@/types/index"

export function useUser(id: string) {
  const services = useServices()
  const loading = ref<boolean>(true)
  const user = ref<User>()

  const fetchUser = async () => {
    loading.value = true
    try {
      
      const response = await services.users.getMySelf(id)
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