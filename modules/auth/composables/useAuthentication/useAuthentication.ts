import {z, type ZodFormattedError} from 'zod'
import { useMyself } from '@/modules/users/composables/useMyself/useMyself'

const schema = z.object({
  email: z.string().min(1, 'Informe um e-mail').email('Insira um e-mail válido'),
  password: z.string().min(1, 'Informe uma senha'),
})


export function useAuthentication() {

  const toast = useToast()
  const services = useServices()
  const loading = ref<boolean>(false)
  const token = useCookie('auth-token', {
    default: () => '',
    secure: true,
    sameSite: 'strict'
  })
  const useMySelf = useMyself()

  const errors = ref<ZodFormattedError<{
    email: string
    password: string
  }>>()


  const form = reactive<{
    email: string
    password: string
  }>({
    email: '',
    password: ''
  })

  const validateForm = () => {
    const result = schema.safeParse({...form})
    if(!result.success) {
      errors.value = result.error.format()
    }

    return result
  }

  const authWithEmail = async () => {
    try {
      loading.value = true

      const { user, accessToken } = await services.auth.signIn(form.email, form.password)

      token.value = accessToken
      
      useMySelf.setUser({...user.profile, email: user.email})
    
      loading.value = false

      navigateTo('/posts')
    } catch (error) {
      loading.value = false
      if (error.status === 401) {
        toast.add({
          severity: 'error',
          summary: 'Login inválido',
          detail: 'O E-mail/Senha está incorreto, tente novamente',
          life: 4000
        })
      }
    }
  }

  const authGithub = async () => {
    try {
      loading.value = true
      // await services.auth.signinWithGithub()

      loading.value = false
    } catch (error) {
      loading.value = false
    }
  }

  return {
    form,
    loading,
    errors,
    token,
    authWithEmail,
    validateForm,
    authGithub,
  }
}