export interface Tag {
  id: string
  name: string
}

export interface Profile {
  id: string
  email: string
  name: string
  createdAt: Date
  username?: string
  bio?: string
  avatarUrl?: string
}

export interface Post {
  id: string
  code: string
  description: string
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