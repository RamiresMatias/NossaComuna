import type { PostDetail, PostType, ReadAllRow, ReadAllRowComments, ReadOneRow, CommentType, PostTable, CreatePostType, EditPostType } from "@/types"

export function readAllAdapter(values: ReadAllRow[] | null): PostType[] | [] {
  if(!values) return []

  return values.map(el => ({
    id: el.id,
    title: el.title,
    isDraft: el.is_draft,
    code: el.code,
    createdAt: new Date(el.created_at),
    coverImage: el.cover_image_url,
    totalComments: 0,
    likes: 0,
    profile: {
      id: el.profile_id,
      username: el.profiles.username,
      avatarUrl: el.profiles.avatar_url
    }
  }))
}

export function readOneAdapter(value: ReadOneRow | null): PostDetail | null {
  if(!value) return null

  return {
    id: value.id,
    title: value.title,
    isDraft: value.is_draft,
    code: value.code,
    createdAt: new Date(value.created_at),
    coverImageUrl: value.cover_image_url,
    profile: {
      id: value.profile_id,
      username: value.profiles.username,
      avatarUrl: value.profiles.avatar_url
    },
    description: JSON.parse(value.description),
    likes: value.likes?.[0]?.count || 0
  }
}

export function readAllCommentsAdapter(values: ReadAllRowComments[] | null): CommentType[] | [] {
  if(!values) return []

  return values.map(el => ({
    id: el.id,
    description: el.description,
    createdAt: new Date(el.created_at),
    profile: {
      id: el.profiles.id,
      username: el.profiles.username,
      avatarUrl: el.profiles.avatar_url
    },
    commentId: el.comment_id,
    comments: []
  }))
}

export function getPostByIdAndAuthorAdapter(value: PostTable['Row']): EditPostType {
  if (!value) return null

  return {
    id: value.id,
    title: value.title,
    isDraft: value.is_draft,
    code: value.code,
    createdAt: new Date(value.created_at),
    coverImageUrl: value.cover_image_url,
    profileId:value.profile_id,
    description: JSON.parse(value.description)
  }
}