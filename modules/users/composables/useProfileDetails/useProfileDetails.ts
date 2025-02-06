import type { Profile, User } from "@/types/index"

export function useProfileDetails(username: string) {

  const services = useServices()
  const loading = ref<boolean>(true)

  const profile = reactive<Profile>({
    avatarUrl: 'http://127.0.0.1:54321/storage/v1/object/public/avatars/bd6a03fa-ebc1-4f59-9e8d-c77a30aa6d73/bd6a03fa-ebc1-4f59-9e8d-c77a30aa6d73',
    bio: 'Software Developer',
    email: 'teste@teste.com.br',
    id: '',
    username: 'Usuário teste',
    createdAt: new Date()
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