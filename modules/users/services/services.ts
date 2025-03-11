
import type { FormEditUser } from "~/types"
import type { AxiosInstance } from "axios"
import type { ICreateProfile, ICreateUser } from "../types/users"


export default (http: AxiosInstance) => ({
  async getMySelf(id: string) {
    const { data } = await http.get(`/profile/${id}`)
    return data
  },
  async update(id: string, { username, bio, avatar, avatarUrl }: FormEditUser) {
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
  async createProfile (profile: Partial<ICreateProfile>) {
    const { data } = await http.post('/profile', profile)
    return data
  },
  async uploadAvatar (file: File, profileId: string) {

    const formData = new FormData()

    formData.set('file', file)

    const { data } = await http.post(`/profile/upload/${profileId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return data
  },
  async getProfileByUsername (username: string) {
    const {data} = await http.get(`/profile/details/${username}`)
    return data
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