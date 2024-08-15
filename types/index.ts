import type { Database } from "@/libs/supabase/schema"

export interface Tag {
  id: string
  description: string
  createdAt: string
}

export interface Profile {
  id: string
  email: string
  createdAt: Date
  username?: string
  bio?: string
  avatarUrl?: string
  avatar?: File
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
  likes?: number
  totalComments?: number
}

export interface CommentType {
  id: string
  description: string
  profile: Partial<Profile>
  createdAt: Date
  comments?: CommentType[]
  commentId?: string
  likes: number
  liked: boolean
}

export interface PostDetail {
  id: string
  code: string
  description: string
  title: string
  createdAt?: Date
  profile: Partial<Profile>
  coverImageUrl: string
  isDraft?: boolean
  totalComments?: number
  likes: number
  liked: boolean
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

export interface CreatePostType {
  id?: string
  description: string
  title: string
  coverImage?: File
  isDraft?: boolean
  profileId?: string
  coverImageUrl?: string
}

export interface CreateUserType {
  avatar: File
  email: string
  password: string
  confirmPassword: string
  username: string
}

export interface EditPostType extends Omit<PostDetail, "profile" | "likes" | "liked"> {
  profileId?: string
  coverImage?: File
}

export type ProfileTableRow = Database['public']['Tables']['profiles'] 
export type PostTable = Database['public']['Tables']['post']
export type CommentTable = Database['public']['Tables']['comment']
export type TagTable = Database['public']['Tables']['tag']

export type ReadAllRow = PostTable['Row'] & {
  profiles: ProfileTableRow['Row'] | null
  likes?: {count: number}[]
  comment?: {count: number}[]
}

export type ReadOneRow = PostTable['Row'] & {
  profiles: ProfileTableRow['Row'] | null
  likes: {count: number}[]
}

export type ReadAllRowComments = CommentTable['Row'] & {
  profiles: ProfileTableRow['Row'] | null
}

export type ReadOnePostRow = Database['public']['Functions']['get_post_by_code']['Returns']
export type ReadAllComments = Database['public']['Functions']['get_all_comments']['Returns']

export type ReadAllTags = TagTable['Row']

export interface BindTagProps {
  postId: string
  tags: Tag[]
}