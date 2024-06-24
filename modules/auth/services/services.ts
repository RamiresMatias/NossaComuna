import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from '@/libs/supabase/schema'
interface ServiceOptions {
  redirectUrl: string
}

interface NewUserProps {
  email: string
  username?: string
  avatar?: File
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
    const { error } = await client.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (!error) {
      return navigateTo('/auth/redirect')
    }

    return error
  },

  async signOut() {
    const { error } = await client.auth.signOut()
    if (!error) navigateTo('/auth')
    return error
  },

  async createUser(user: NewUserProps) {

    const {data, error} = await client.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: {
          username: user.username
        }
      }
    })

    if (!error && user.avatar && data.user) {
      await this.uploadAvatar({id: data.user.id, file: user.avatar})
    }

    if (!error) {
      navigateTo('/posts')
    }

    return data
  },
  async uploadAvatar ({id, file}: {file: File, id: string}) {

    const runtimeConfig = useRuntimeConfig()

    const fileName = `/${id}/${id}`

    const {data, error} = await client.storage
      .from("avatars")
      .upload(fileName, file, {
        upsert: true
      })

    if (error) return

    await client.from('profiles').update({
      avatar_url: `${runtimeConfig.public.supabaseUrl}/storage/v1/object/public/${data.fullPath}`
    }).eq('id', id)
  }
})