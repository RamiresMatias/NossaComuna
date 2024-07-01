import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from '@/libs/supabase/schema'
import type { CreatePostType, ReadAllRow, ReadAllRowComments, ReadOneRow } from "@/types"

import {useSession} from '@/modules/auth/composables/useSession/useSession'

import {v4} from 'uuid'
import { getPostByIdAndAuthorAdapter, readAllAdapter, readAllCommentsAdapter, readOneAdapter } from "./adapter"

type ReplyCommentProps = {
  description: string
  postId: string
  commentId: string
  userId: string
}

export default (client: SupabaseClient<Database>) => ({

  async createPost (post: CreatePostType) {
    const runtimeConfig = useRuntimeConfig()

    if (!post.profileId) throw new Error("É necessário estar logado para criar um post")

    const id = v4()

    let coverImageUrl = ''

    if (post.coverImage) {
      coverImageUrl = await this.uploadCoverImage({id: post.id, file: post.coverImage, userId: post.profileId})
    }

    return client
      .from('post')
      .insert({
        id,
        title: post.title,
        description: JSON.stringify(post.description),
        is_draft: post.isDraft,
        created_at: new Date(),
        cover_image_url: coverImageUrl,
        code: removeAccents(transformCode(post.title)),
        profile_id: post.profileId 
      })
  },
  async editPost (post: CreatePostType) {
    const runtimeConfig = useRuntimeConfig()

    if (!post.profileId) throw new Error("É necessário estar logado para criar um post")
    if (!post.id) throw new Error("Informe o ID do post")

    let coverImageUrl = ''

    if (post.coverImage) {
      coverImageUrl = await this.updateCoverImage({id: post.id, file: post.coverImage, userId: post.profileId})
    }

    return client
      .from('post')
      .update({
        title: post.title,
        description: JSON.stringify(post.description),
        cover_image_url: (coverImageUrl || post.coverImageUrl),
        profile_id: post.profileId,
        code: removeAccents(transformCode(post.title))
      })
      .match({id: post.id})
  },
  async getAllPosts () {
    const {data} = await client
      .from('post')
      .select('id, title, is_draft, code, created_at, cover_image_url, profiles!inner(id, username, avatar_url)')
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
    const runtimeConfig = useRuntimeConfig()

    const {data, error} = await client.storage
      .from("cover_images")
      .upload(`/${userId}/${id}`, file, {
        upsert: true
      })

    if (error) return ''
    else return `${runtimeConfig.public.supabaseUrl}/storage/v1/object/public/${data.fullPath}`
  },
  async updateCoverImage ({id, file, userId}: {file: File, id: string; userId: string}) {
    const runtimeConfig = useRuntimeConfig()

    const {data, error} = await client.storage
      .from("cover_images")
      .update(`/${userId}/${id}`, file, {
        cacheControl: '300',
        upsert: true
      })

    if (error) return ''
    else return `${runtimeConfig.public.supabaseUrl}/storage/v1/object/public/${data.fullPath}`
  },
  async getAllComments (postId: string) {
    const {data} = await client
      .from('comment')
      .select('id, description, created_at, profiles!inner(id, username, avatar_url), comment(id)')
      .eq('post_id', postId)
      .is('comment_id', null)
      .order('created_at', {ascending: true})
      .returns<ReadAllRowComments[]>()

    return readAllCommentsAdapter(data)
  },
  async getReplies (commentId: string) {
    const {data} = await client
      .from('comment')
      .select('id, description, created_at, comment_id, profiles!inner(id, username, avatar_url)')
      .eq('comment_id', commentId)
      .order('created_at', {ascending: true})
      .range(0, 1)
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

    return getPostByIdAndAuthorAdapter(data)
  },
  async replyComment ({description, postId, commentId, userId}: ReplyCommentProps) {
    return client
      .from('comment')
      .insert({
        id: v4(),
        description,
        post_id: postId,
        profile_id: userId,
        comment_id: commentId
      })
  }
})