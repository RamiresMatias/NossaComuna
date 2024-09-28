export interface SendMail {
  template: string
  to: string
  fromEmail: string
  fromName: string
  subject: string
  text: string
  html: string
}