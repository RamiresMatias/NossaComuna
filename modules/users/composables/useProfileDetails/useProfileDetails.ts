import type { Profile, User } from "@/types/index"

export function useProfileDetails(username: string) {

  const services = useServices()
  const loading = ref<boolean>(true)

  const profile = reactive<Profile>({
    avatarUrl: '',
    bio: '',
    email: '',
    id: '',
    username: '',
    createdAt: null
  })
  
  const getProfileDetails = async (): Promise<Profile> => {  
    try {
      loading.value = true
      const data = await services.users.getProfileByUsername(username)
      Object.assign(profile, {
        ...data,
        email: data.user.email
      })

      loading.value = false

      return profile
    } catch (error) {
      console.log(error);
      loading.value = false
    }
  }

  return {
    loading,
    profile,
    getProfileDetails
  }
}