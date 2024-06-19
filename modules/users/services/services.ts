import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from '@/libs/supabase/schema'
import { getMySelfAdapter } from "./adapters"
import type { FormEditUser } from "~/types"


export default (client: SupabaseClient<Database>) => ({
  async getMySelf(id: string) {
    const response = await client.from('profiles').select('*').eq('id', id).limit(1).single()
    const user = getMySelfAdapter(response.data)
    return user
  },
  async update(id: string, { username, bio, avatar, avatarUrl }: FormEditUser) {
    let avatar_url = ''

    const runtimeConfig = useRuntimeConfig()
    runtimeConfig.public.supabaseUrl

    if (avatar) {
      const { data, error } = await this.uploadAvatar({id, file: avatar, url: avatarUrl})
      if (!error) avatar_url = `${runtimeConfig.public.supabaseUrl}/storage/v1/object/public/${data.fullPath}`
    }

    const objUpdated: any = {
      username,
      bio,
    }

    if (avatar_url) objUpdated.avatar_url = avatar_url

    await client.from('profiles').update(objUpdated).eq('id', id)

    return { id }
  },
  async uploadAvatar ({id, file, url}: {file: File, id: string, url?: string}) {
    const fileName = `/${id}/${id}`

    if (url && file) {
      return client.storage
        .from('avatars')
        .update(fileName, file, {
          cacheControl: '300',
          upsert: true
        })
    } else {
      return client.storage
        .from("avatars")
        .upload(fileName, file, {
          upsert: true
        })
    }
  },
})