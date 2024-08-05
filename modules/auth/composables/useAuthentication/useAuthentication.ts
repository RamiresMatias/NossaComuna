export function useAuthentication() {

  const toast = useToast()
  const services = useServices()
  const loading = ref<boolean>(false)
  const form = reactive<{
    email: string
    password: string
  }>({
    email: '',
    password: ''
  })

  const authWithEmail = async () => {
    try {
      loading.value = true
      const response = await services.auth.signInWithEmail(form.email, form.password)
    
      if (response.name === 'AuthApiError') {
        toast.add({
          severity: 'error',
          summary: 'Login inválido',
          detail: 'O E-mail/Senha está incorreto, tente novamente',
          life: 4000
        })
      }
    
      loading.value = false
    } catch (error) {
      console.log({error});
    }
  }

  return {
    form,
    loading,
    authWithEmail
  }
}