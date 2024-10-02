import { useMailer } from '#mailer'
import { SendMail } from '~/server/types'
import createEmailTemplate from './templates/forgotPassword'
import { v4 } from 'uuid'



export default defineEventHandler(async (event) => {
  const reqBody = await readBody<SendMail>(event)
  const mailService = useMailer()

  const runtimeConfig = useRuntimeConfig()

  /**
   * @TODO Enviar o token criptografado com as informações necessárias 
   * para redefinição de senha
   */
  const redirectUrl = `${runtimeConfig.public.siteUrl}/forgot-password?email=${reqBody.to}`

  const template = createEmailTemplate('NossaComuna Suporte', redirectUrl)

  const transporter = mailService.customTransporter({
    host: runtimeConfig.mailerHost,
    port: Number(runtimeConfig.mailerPort),
    secure: true,
    auth: {
      user: runtimeConfig.mailerUser,
      pass: runtimeConfig.mailerPass
    }
  })


  return await mailService.sendMail({
    requestId: v4(),
    options: {
      fromName: 'NossaComuna',
      to: reqBody.to,
      subject: 'Redefinição de senha',
      text: template.text,
      html: template.html
    },
    transporter: transporter
  })
})