export interface ICreateUser {
  id: string
  email: string
  password: string
  confirmPassword: string
}

export interface ICreateProfile {
  avatar: File
  username: string
  bio: string
  userId: string
}

export type StateFormStype = 'buttons' | 'form' | 'create-user' | 'create-profile'