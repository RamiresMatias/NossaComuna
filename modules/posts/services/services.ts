import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from '@/libs/supabase/schema'
import type { CreatePostType, ReadAllRow, ReadAllRowComments, ReadOneRow } from "@/types"

import {useSession} from '@/modules/auth/composables/useSession/useSession'

import {v4} from 'uuid'
import { readAllAdapter, readAllCommentsAdapter, readOneAdapter } from "./adapter"

export default (client: SupabaseClient<Database>) => ({

  async createPost (post: CreatePostType) {
    const {user} = useSession()
    const runtimeConfig = useRuntimeConfig()

    if (!user.value) throw new Error("É necessário estar logado para criar um post")

    const id = v4()

    let coverImageUrl = ''

    if (post.coverImage) {
      const {data, error} = await this.uploadCoverImage({id, file: post.coverImage, userId: user.value.id})
      if (!error) coverImageUrl = `${runtimeConfig.public.supabaseUrl}/storage/v1/object/public/${data.fullPath}`
    }

    return client
      .from('post')
      .insert({
        id,
        title: post.title,
        description: JSON.stringify(post.description),
        is_draft: post.isDraft,
        created_at: new Date(),
        cover_image: coverImageUrl,
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
  },
  async uploadCoverImage ({id, file, userId}: {file: File, id: string; userId: string}) {
    return client.storage
      .from("cover_images")
      .upload(`/${userId}/${id}`, file, {
        upsert: true
      })
  },
  async getAllComments (postId: string) {
    const {data} = await client
      .from('comment')
      .select('id, description, created_at, profiles!inner(id, username, avatar_url)')
      .eq('post_id', postId)
      .order('created_at', {ascending: true})
      .returns<ReadAllRowComments[]>()

    return readAllCommentsAdapter(data)
  },
  async createComment ({description, postId}: {description: string; postId: string}) {

    const {user} = useSession()

    return client
      .from('comment')
      .insert({
        id: v4(),
        description,
        post_id: postId,
        profile_id: user.value.id 
      })
  },
  async deleteComment (id: string) {
    return client.from('comment').delete().match({id})
  },
  async getPostByIdAndAuthor ({id, userId}: {id: string; userId: string}) {
    const {data} = await client
      .from('post')
      .select('*')
      .eq('id', id)
      .eq('profile_id', userId)
      .limit(1)
      .returns<{}>()
      .single()

    console.log(data);
  }
})