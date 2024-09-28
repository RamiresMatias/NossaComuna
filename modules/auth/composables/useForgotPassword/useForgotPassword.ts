import {z, type ZodFormattedError} from 'zod'


const schema = z.object({
  email: z.string().min(1, 'Informe um e-mail').email('Insira um e-mail válido'),
})


export function useForgotPassword() {

  const email = ref<string>('')
  const errors = ref<ZodFormattedError<string>>()
  const loading = ref<boolean>(false)

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

      await $fetch('/api/email/forgotPassword', {
        method: 'POST',
        body: {
          to: email.value
        }
      })

      loading.value = false
    } catch (error) {
      console.log(error)
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