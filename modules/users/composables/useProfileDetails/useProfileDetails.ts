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
  
  const getProfileDetails = async () => {

    if (!username) return navigateTo('/404')
  
    try {
      loading.value = true
      const data = await services.users.getUserByUsername(username)
      Object.assign(profile, data)

      await sleep(1000)

      loading.value = false
    } catch (error) {
      console.log(error);
      loading.value = false
    }
  }

  onMounted(() => {
    getProfileDetails()
  })

  return {
    loading,
    profile,
    getProfileDetails
  }
}