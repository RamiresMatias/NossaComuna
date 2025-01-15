
import { getMySelfAdapter } from "./adapters"
import type { FormEditUser } from "~/types"
import type { AxiosInstance } from "axios"
import type { ICreateProfile, ICreateUser } from "../types/users"


export default (http: AxiosInstance) => ({
  async getMySelf(id: string) {
    const { data } = await http.get(`/profile/${id}`)
    return data
  },
  async update(id: string, { username, bio, avatar, avatarUrl }: FormEditUser) {
    let newAvatarUrl = ''

    // const runtimeConfig = useRuntimeConfig()

    // if (avatar) {
    //   const { data, error } = await this.uploadAvatar({id, file: avatar, url: avatarUrl})
    //   if (!error) newAvatarUrl = `${runtimeConfig.public.supabaseUrl}/storage/v1/object/public/${data.fullPath}`
    // }

    // const objUpdated: any = {
    //   username,
    //   bio,
    // }

    // if (newAvatarUrl) objUpdated.avatar_url = newAvatarUrl

    // await client.from('profiles').update(objUpdated).eq('id', id)
    const { data } = await http.put(`/profile/${id}`, {
      bio,
      username
    })
    return data
  },
  async createUser ({ email, password }: Partial<ICreateUser>) {
    const { data } = await http.post('/user', {email, password})
    return data
  },
  async createProfile ({}: Partial<ICreateProfile>) {
    const { data } = await http.post('/profile')
  }
  // async uploadAvatar ({id, file, url}: {file: File, id: string, url?: string}) {
  //   const fileName = `/${id}/${id}`

  //   if (url && file) {
  //     return client.storage
  //       .from('avatars')
  //       .update(fileName, file, {
  //         cacheControl: '300',
  //         upsert: true
  //       })
  //   } else {
  //     return client.storage
  //       .from("avatars")
  //       .upload(fileName, file, {
  //         upsert: true
  //       })
  //   }
  // },
  // async getUserById (id: string) {
  //   return this.getMySelf(id)
  // },
  // async getUserByUsername (username: string) {
  //   const response = await client.from('profiles').select('*').eq('username', username).limit(1).single()
  //   const user = getMySelfAdapter(response.data)
  //   return user
  // },
  // async checkUsernameExists (username: string) {
  //   return client
  //     .from('profiles')
  //     .select('username')
  //     .eq('username', username)
  //     .limit(1)
  // }
})