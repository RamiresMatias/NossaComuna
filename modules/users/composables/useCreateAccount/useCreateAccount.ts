import type { CreateUserType } from "@/types"
import {z, type ZodFormattedError} from 'zod'

const schema = z.object({
  email: z.string().min(1, 'Informe um e-mail').email('Insira um e-mail válido'),
  password: z.string().min(1, 'Informe uma senha'),
  confirmPassword: z.string().min(1, 'Informe a confirmação da senha'),
  username: z.string().min(4, 'O username precisa de no mínimo 4 caracteres').regex(/^(?=.*[A-Za-z0-9]).{3,30}$/, 'Digite um username válido'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas precisam ser iguais',
  path: ['confirmPassword']
})

export function useCreateAccount() {

  const services = useServices()
  const loading = ref<boolean>(false)
  const toast = useToast()

  const errors = ref<ZodFormattedError<CreateUserType>>()

  const form = reactive<CreateUserType>({
    avatar: null,
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  })

  const validateForm = () => {
    const result = schema.safeParse({...form})
    if(!result.success) {
      errors.value = result.error.format()
    }

    return result
  }
  
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
      console.log({...error});
      if (error.status === 422) {
        toast.add({
          severity: 'error',
          summary: 'Erro ao tentar criar usuário',
          detail: 'O usuário informado já existe',
          life: 4000
        })
      }
      else {
        toast.add({
          severity: 'error',
          summary: 'Erro ao tentar criar usuário',
          life: 4000
        })
      }
      loading.value = false
    }
  }

  return {
    loading,
    form,
    errors,
    validateForm,
    createUser
  }
}