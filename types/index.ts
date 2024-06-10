import type { OutputData } from "@editorjs/editorjs"

export interface Tag {
  id: string
  description: string
}

export interface Profile {
  id: string
  email: string
  createdAt: Date
  username?: string
  bio?: string
  avatarUrl?: string
}

export interface User extends Profile {}

export interface Post {
  id: string
  code: string
  description: OutputData
  title: string
  createdAt: Date
  profile: Partial<Profile>
  coverImage: string
  isDraft?: boolean
  totalComments: number
  totalLikes: number
}

export interface Comment {
  id: string
  description: string
  profile: Profile
  createdAt: Date
  postId?: string
  commentId?: string
  comments?: Comment[]
}

export interface PostDetail {
  id: string
  title: string
  createdAt: Date
  profileId: string
  coverImage: string
  likes: number
  isDraft?: boolean
  comments: Comment[]
}

export interface Likes {
  id: string
  profileId: string
  createdAt: Date
  postId?: string
  commentId?: string
}

export interface FormEditUser {
  avatar?: File
  email?: string
  username: string
  bio?: string
  avatarUrl?: string
}