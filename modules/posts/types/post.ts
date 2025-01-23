import type { CommentType } from "~/types"

export interface ILikeCommentProps {
  commentId: string
  postId: string
}

export interface ICreateComment {
  content: string
  postId: string
  profileId: string
  commentId?: string
}

export interface ICommentPost {
  id: string
  profileId: string
  postId: string
  createdAt: string
  content: string
  commentId: string
  liked: boolean
  username: string
  email: string
  avatarUrl: string
  likes: number
  comments: ICommentPost[]
}