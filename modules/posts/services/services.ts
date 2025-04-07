import type { CreatePostType, EditPostType, FilterPostListProps } from "@/types"

import type { AxiosInstance } from "axios"
import type { ICreateComment, IPostResponse } from "../types/post"
import { formatDatePtBr } from '@/utils/index'

interface GetAllPosts {
  to: number,
  size: number,
  filters: FilterPostListProps
}

export default (http: AxiosInstance) => ({

  async getAllPosts (params: GetAllPosts): Promise<IPostResponse> {

    const { data } = await http.get('/post', {
      params: {
        to: params.to,
        size: params.size,
        tags: params.filters.tags,
        search: params.filters.search,
      },
      paramsSerializer: () => serializeParams({...params.filters, to: params.to, size: params.size})
    })

    return {
      items: data.items.map(el => ({
        ...el,
        likes: el._count.likes,
        comments: el._count.comments,
        tags: el.tags.map(el => ({...el.Tag})),
        createdAt: formatDatePtBr(el.createdAt, { month: "long", day: "numeric" }),
        profile: {
          ...el.profile,
          avatarUrl: getImageNoCache(el.profile?.avatarUrl),
        }
      })),
      totalItems: data.totalItems
    }
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
      })),
      profile: {
        ...data.profile,
        avatarUrl: getImageNoCache(data.profile?.avatarUrl),
        createdAt: formatDatePtBr(data.profile.createdAt, { month: "long", day: "numeric" })
      },
      createdAt: formatDatePtBr(data.createdAt, { month: "long", day: "numeric" })
    }
  },

  async getAllComments ({postId}: {postId: string}) {
    const { data } = await http.get(`/comment/post/${postId}`)
    return data
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

    if (data.id && typeof post.coverImage !== 'string' && post.coverImage) {
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
    return data.map(el => ({
      ...el,
      likes: el._count.likes,
      tags: el.tags.map((el) => ({
        description: el.Tag.description,
        id: el.tagId
      }))
    }))
  },
  async getPostByIdAndAuthor (postId: string) {
    const { data } =  await http.get(`/post/${postId}`)
    return data
  },
  async like ({postId, profileId, commentId}: {postId: string, profileId: string, commentId: string}) {
    const { data } =  await http.post(`/like`, {
      profileId,
      postId,
      commentId
    })
    return data
  },
  async deslike ({postId, profileId, commentId}: {postId: string, profileId: string, commentId: string}) {
    const { data } =  await http.delete(`/like`, {
      data: {
        profileId,
        postId,
        commentId
      }
    })
    return data
  },
  async createComment ({ content, postId, commentId, profileId }: ICreateComment) {
    const { data } =  await http.post(`/comment`, {content, postId, commentId, profileId})
    return data
  },
  async deleteComment (commentId: string) {
    const { data } =  await http.delete(`/comment/${commentId}`)
    return data
  },
  async getPostsByLiked (profileId: string) {
    const { data } = await http.get(`/post/posts-liked-by/${profileId}`)
    return data.map(el => ({
      ...el,
      likes: el._count.likes,
      tags: el.tags.map((el) => ({
        description: el.Tag.description,
        id: el.tagId
      }))
    }))
  },
  async isAuthorPost (postId: string) {
    const { data } = await http.get(`/post/${postId}/is-author`)
    return data
  },
})