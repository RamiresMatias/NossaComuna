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
    const { error } = await client.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) console.log(error)
  },

  async signOut() {
    const response = await client.auth.signOut()
    return response
  },

  async createUser(user: NewUserProps) {
    const res = await client.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: {
          avatar_url: '',
          username: user.username
        }
      }
    })
    console.log(res);
    // if (!error && user.avatar) {
    //   const fileExt = `${user.email}.${user.avatar.split('.').at(0)}`
    //   const responseUplaod = await client.storage.from("avatars").upload(fileExt, user.avatar)
    //   console.log({responseUplaod});
    // }
  }
})