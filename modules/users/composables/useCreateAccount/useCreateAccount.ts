import type { CreateUserType } from "@/types"

export function useCreateAccount() {

  const services = useServices()
  const loading = ref<boolean>(false)

  const form = reactive<CreateUserType>({
    avatar: null,
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  })
  
  const createUser = async () => {  
    try {
      loading.value = true
      await services.auth.createUser({
        email: form.email, 
        password: form.password,
        username: form.username,
        avatar: form.avatar
      })

      await sleep(1000)

      loading.value = false
      navigateTo('/posts')
    } catch (error) {
      console.log(error);
      loading.value = false
    }
  }

  return {
    loading,
    form,
    createUser
  }
}