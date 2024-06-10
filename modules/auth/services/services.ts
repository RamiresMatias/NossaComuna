import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from '@/libs/supabase/schema'

interface ServiceOptions {
  redirectUrl: string
}

interface NewUserProps {
  email: string
  username?: string
  avatar?: string
  password: string
}

export default (client: SupabaseClient<Database>, options: ServiceOptions) => ({
  async signinWithGithub() {
    const response = await client.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: options.redirectUrl
      }
    })
    return response
  },

  async signInWithEmail(email: string, password: string) {
    const { error, data } = await client.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (!error) {
      navigateTo('/auth/redirect')
    }
  },

  async signOut() {
    const { error } = await client.auth.signOut()
    if (!error) navigateTo('/auth')
    return error
  },

  async createUser(user: NewUserProps) {
    const { error } = await client.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: {
          username: user.username
        }
      }
    })
    if (error) return false

    // if (user.avatar) {
    //   const fileExt = `public/${user.email}.${user.avatar?.split(';')?.at(0)?.split('/').at(-1)}`
    //   client.storage
    //     .from("avatars")
    //     .upload(fileExt, user.avatar, {
    //       cacheControl: '3600',
    //       upsert: false
    //     })
    //     .then((res: any) => {
    //       console.log(res);
    //     })
    // }
  }
})