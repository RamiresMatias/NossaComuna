import {z, type ZodFormattedError} from 'zod'


const schema = z.object({
  email: z.string().min(1, 'Informe um e-mail').email('Insira um e-mail válido'),
})


export function useForgotPassword() {

  const email = ref<string>('')
  const errors = ref<ZodFormattedError<string>>()
  const loading = ref<boolean>(false)
  const services = useServices()

  const toast = useToast()

  const validateForm = () => {
    const result = schema.safeParse(email.value)
    if(!result.success) {
      errors.value = result.error.format()
    }

    return result
  }

  const sendEmail = async () => {
    try {
      loading.value = true


      const response = await services.auth.recoverPassword(email.value)
      console.log(response);
      // await $fetch('/api/email/forgotPassword', {
      //   method: 'POST',
      //   body: {
      //     to: email.value
      //   }
      // })

      toast.add({
        severity: 'success',
        summary: 'E-mail enviado com sucesso',
        detail: 'Verifique a caixa de entrada do e-mail informado',
        life: 4000
      })

      loading.value = false
    } catch (error) {
      console.log(error)

      toast.add({
        severity: 'error',
        summary: 'Erro ao tentar enviar o e-mail',
        detail: error,
        life: 4000
      })

      loading.value = false
    }
  }

  return {
    email,
    loading,
    sendEmail,
    validateForm
  }
}