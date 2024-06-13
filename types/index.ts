import type { OutputData } from "@editorjs/editorjs"
import type { Database } from "@/libs/supabase/schema"

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

export interface PostType {
  id: string
  code: string
  title: string
  createdAt?: Date
  profile: Partial<Profile>
  coverImage: string
  isDraft?: boolean
  totalLikes?: number
  totalComments?: number
}

export interface CommentType {
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
  code: string
  description: OutputData
  title: string
  createdAt?: Date
  profile: Partial<Profile>
  coverImage: string
  isDraft?: boolean
  totalComments?: number
  totalLikes?: number
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

export type ProfileTableRow = Database['public']['Tables']['profiles']

export type PostTable = Database['public']['Tables']['post']

export type ReadAllRow = PostTable['Row'] & {
  profiles: ProfileTableRow['Row'] | null
}

export type ReadOneRow = PostTable['Row'] & {
  profiles: ProfileTableRow['Row'] | null
}