import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from '@/libs/supabase/schema'
import type { BindTagProps, ReadAllTags, Tag } from "~/types"
import { readAllAdapter } from "./adapter"
import { v4 } from "uuid"

export default (client: SupabaseClient<Database>) => ({ 
  async getTags () {
    const { data } = await client
      .from('tag')
      .select('*')
      .order('created_at', {ascending: true})
      .returns<ReadAllTags[]>()

    return readAllAdapter(data)
  },

  async create (description: string) {
    return client
      .from('tag')
      .insert({
        id: v4(),
        description
      })
      .select()
  },

  async bindTags ({postId, tags}: BindTagProps) {
    return client
      .from('tag_x_post')
      .insert(
        tags.map(el => ({
          id: v4(),
          postId,
          tagId: el.id
        }))
      )
      .select()
  },

  async removeBindTagsFromPost (postId: string) {
    const { error } = await client
      .from('tag_x_post')
      .delete()
      .in('post_id', postId) 

    return error
  }
})