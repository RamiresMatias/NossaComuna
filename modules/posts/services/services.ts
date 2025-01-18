import type { Database } from '@/libs/supabase/schema'
import type { CreatePostType, EditPostType, FilterPostListProps, ReadAllRow, ReadOneRow } from "@/types"

import { getPostByIdAndAuthorAdapter, readAllAdapter, readAllCommentsAdapter, readOneAdapter, readOneAdapterRpc } from "./adapter"

import {v4} from 'uuid'
import type { AxiosInstance } from "axios"

interface ReplyCommentProps {
  description: string
  postId: string
  commentId: string
  userId: string
}

interface GetAllPosts {
  to: number,
  size: number,
  filters: FilterPostListProps
}

export default (http: AxiosInstance) => ({

  async getAllPosts (params: GetAllPosts) {

    const { data } = await http.get('/post', {
      params: {
        to: params.to,
        size: params.size,
        tags: params.filters.tags,
        search: params.filters.search,
      },
      paramsSerializer: () => serializeParams({...params.filters, to: params.to, size: params.size})
    })
    return data.map(el => ({
      ...el,
      likes: el._count.likes,
      comments: el._count.comments,
      tags: el.tags.map(el => ({...el.Tag}))
    }))
  },

  async getPostByCode ({username, code}: {username: string; code: string}) {
    const { data } = await http.get(`/post/${username}/${code}`)
    return {
      ...data,
      likes: data._count.likes,
      coverImageUrl: data.coverImage,
      tags: data.tags.map((el) => ({
        description: el.Tag.description,
        id: el.tagId
      }))
    }
  },

  async getAllComments ({postId}: {postId: string}) {
    const { data } = await http.get(`/comment/post/${postId}`)
    return data.map(el => ({
      ...el,
      likes: el._count.like
    }))
  },

  async createPost (post: CreatePostType) {

    if (!post.profileId) throw new Error("É necessário estar logado para criar um post")

    const { data } = await http.post('/post', post)

    if (data.id && post.coverImage) {
      await this.uploadCoverImage(post.coverImage, data.id)
    }

    return data
  },
  async editPost (post: EditPostType) {
    const { data } = await http.put(`/post/${post.id}`, post)

    if (data.id && typeof post.coverImage !== 'string') {
      await this.uploadCoverImage(post.coverImage, data.id)
    }

    return data
  },
  async uploadCoverImage (file: File, postId: string) {
    const formData = new FormData()

    formData.set('file', file)

    return await http.post(`/post/upload/${postId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  async getPostsByUsername (username: string) {
    const { data } = await http.get(`/post/all-posts/${username}`)
    return data
  },
  async getPostByIdAndAuthor (postId: string) {
    const { data } =  await http.get(`/post/${postId}`)
    return data
  },
})