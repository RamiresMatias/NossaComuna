import type { CreateUserType } from "@/types"
import {z, type ZodFormattedError} from 'zod'
import type { ICreateProfile, ICreateUser } from "../../types/users"

const schema = z.object({
  username: z.string().min(4, 'O nome de usuário precisa de no mínimo 4 caracteres').regex(/^(?=.*[A-Za-z0-9]).{3,30}$/, 'Digite um nome de usuário válido'),
})

const userSchema = z.object({
  email: z.string().min(1, 'Informe um e-mail').email('Insira um e-mail válido'),
  password: z.string().min(1, 'Informe uma senha'),
  confirmPassword: z.string().min(1, 'Informe a confirmação da senha'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas precisam ser iguais',
  path: ['confirmPassword']
})

export function useCreateAccount() {

  const services = useServices()
  const loading = ref<boolean>(false)
  const toast = useToast()

  const errors = ref<ZodFormattedError<CreateUserType>>()
  const errorsUsers = ref<ZodFormattedError<ICreateUser>>()

  const form = reactive<ICreateProfile>({
    avatar: null,
    username: null,
    bio: null,
    userId: null
  })

  const formUser = ref<ICreateUser>({
    id: null,
    confirmPassword: null,
    password: null,
    email: null
  })

  const validateForm = () => {
    const result = schema.safeParse({...form})
    if(!result.success) {
      errors.value = result.error.format()
    }

    return result
  }

  const validateFormUser = () => {
    const result = userSchema.safeParse({...formUser.value})
    if(!result.success) {
      errorsUsers.value = result.error.format()
    }

    return result
  }

  const createUser = async () => {
    try {
      const data = await services.users.createUser({
        email: formUser.value.email,
        password: formUser.value.password
      })

      toast.add({
        severity: 'success',
        summary: 'Sucesso!',
        detail: 'Seu usuário foi criado com sucesso',
        life: 2000
      })

      formUser.value.id = data.id
      form.userId = data.id
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Erro!',
        detail: error?.message || 'Houve um erro ao cadastrar seu usuário',
        life: 2000
      })
      throw error
    }
  }

  const createProfile = async () => {
    try {
      const response = await services.users.createProfile({
        userId: form.userId,
        username: form.username,
        avatar: form.avatar,
        bio: form.bio,
      })

      if (response.id && form.avatar) {
        await services.users.uploadAvatar(form.avatar, response.id)
      }

      toast.add({
        severity: 'success',
        summary: 'Sucesso!',
        detail: 'Os dados do perfil foram cadastrados com sucesso',
        life: 2000
      })
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Erro!',
        detail: error?.message || 'Houve um erro ao cadastrar os dados do seu perfil',
        life: 2000
      })
      throw error
    }
  }

  // const createUser = async () => {  
  //   try {
  //     loading.value = true

  //     const { data: usernameExists } = await services.users.checkUsernameExists(form.username)

  //     if (usernameExists[0]) {
  //       loading.value = false
  //       return toast.add({
  //         severity: 'error',
  //         summary: 'Erro ao tentar criar usuário',
  //         detail: 'Nome de usuário já utilizado, tente outro!',
  //         life: 4000
  //       })
  //     }

  //     await services.auth.createUser({
  //       email: form.email, 
  //       password: form.password,
  //       username: form.username,
  //       avatar: form.avatar
  //     })
  //     await sleep(1000)

  //     loading.value = false
  //     navigateTo(`/confirm/${form.email}`)
  //   } catch (error) {
  //     if (error.status === 422) {
  //       toast.add({
  //         severity: 'error',
  //         summary: 'Erro ao tentar criar usuário',
  //         detail: 'O usuário informado já existe',
  //         life: 4000
  //       })
  //     }
  //     else {
  //       toast.add({
  //         severity: 'error',
  //         summary: 'Erro ao tentar criar usuário',
  //         life: 4000
  //       })
  //     }
  //     loading.value = false
  //   }
  // }

  return {
    loading,
    form,
    errors,
    formUser,
    errorsUsers,
    validateForm,
    validateFormUser,
    createUser,
    createProfile,
  }
}