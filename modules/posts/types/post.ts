import type { CommentType } from "~/types"

export interface ILikeCommentProps {
  comments: CommentType[]
  commentId: string
  postId: string
}

export interface ICreateComment {
  content: string
  postId: string
  profileId: string
  commentId?: string
}