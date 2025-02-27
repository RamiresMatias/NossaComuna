import type { AxiosInstance } from "axios"

export default (client: AxiosInstance) => ({ 
  async getTags () {
    const { data } = await client.get('/tag')
    return data
  },

  async create (description: string) {
    const { data } = await client.post('/tag', { description })
    return data
  },

  // async bindTags ({postId, tags}: BindTagProps) {
  //   return client
  //     .from('tag_x_post')
  //     .insert(
  //       tags.map(el => ({
  //         id: v4(),
  //         post_id: postId,
  //         tag_id: el.id
  //       }))
  //     )
  //     .select()
  // },

  // async removeBindTagsFromPost (postId: string) {
  //   const { error } = await client
  //     .from('tag_x_post')
  //     .delete()
  //     .eq('post_id', postId) 

  //   return error
  // },

  // async getPostTags (postId: string) {
  //   const { data } = await client
  //     .from('tag_x_post')
  //     .select('id, tag(id, description)')
  //     .eq('post_id', postId)
  //     .order('created_at', {ascending: true})
  //     .returns<ReadAllPostTags[]>()

  //   return readAllPostTagsAdapter(data)
  // }
})