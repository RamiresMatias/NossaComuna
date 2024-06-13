import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from '@/libs/supabase/schema'
import type { PostDetail, ReadAllRow, ReadOneRow } from "@/types"

import {useSession} from '@/modules/auth/composables/useSession/useSession'

import {v4} from 'uuid'
import { readAllAdapter, readOneAdapter } from "./adapter"

export default (client: SupabaseClient<Database>) => ({

  async createPost (post: Partial<PostDetail>) {
    const {user} = useSession()

    if (!user.value) throw new Error("É necessário estar logado para criar um post")

    return client
      .from('post')
      .insert({
        id: v4(),
        title: post.title,
        description: JSON.stringify(post.description),
        is_draft: post.isDraft,
        created_at: new Date(),
        cover_image: '',
        code: removeAccents(transformCode(post.title)),
        profile_id: user.value.id 
      })
  },
  async getAllPosts () {
    const {data} = await client
      .from('post')
      .select('id, title, is_draft, code, created_at, cover_image, profiles!inner(id, username, avatar_url)')
      .order('created_at', {ascending: true})
      .returns<ReadAllRow[]>()

    return readAllAdapter(data)
  },
  async getPostByCode ({username, code}: {username: string; code: string}) {
    const {data} = await client
      .from('post')
      .select('*, profiles!inner(id, username, avatar_url)')
      .eq('code', code)
      .eq('profiles.username', username)
      .limit(1)
      .returns<ReadOneRow[]>()
      .single()

    return readOneAdapter(data)
  }
})