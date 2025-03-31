
export interface Tag {
  id: string
  description: string
  createdAt?: string
}

export interface Profile {
  id: string
  email?: string
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
  createdAt?: string
  profile: Partial<Profile>
  coverImage?: string
  isDraft?: boolean
  likes: number
  comments: number,
  tags: Tag[]
}

export interface CommentType {
  id: string
  content: string
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
  content: string
  title: string
  createdAt?: Date
  profile: Partial<Profile>
  coverImageUrl: string
  isDraft?: boolean
  comments?: number
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
  content: string
  title: string
  coverImage?: File
  isDraft?: boolean
  profileId?: string
  coverImageUrl?: string
  tags: string[]
  code: string
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
  tags: string[]
}

export interface BindTagProps {
  postId: string
  tags: Tag[]
}

export interface FilterPostListProps {
  tags?: string[]
  search?: string
}

export interface AuthResponse {
  accessToken: string
  user: {
    email: string
    id: string
    profile: Profile
  }
}