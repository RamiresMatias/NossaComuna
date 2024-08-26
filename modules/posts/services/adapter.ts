import type { PostDetail, PostType, ReadAllRow, ReadOneRow, CommentType, PostTable, CreatePostType, EditPostType, ReadOnePostRow, ReadAllComments } from "@/types"

export function readAllAdapter(values: ReadAllRow[] | null): PostType[] | [] {
  if(!values) return []

  return values.map(el => ({
    id: el.id,
    title: el.title,
    isDraft: el.is_draft,
    code: el.code,
    createdAt: new Date(el.created_at),
    coverImage: el.cover_image_url,
    totalComments: el.comment?.[0]?.count || 0,
    likes: el.likes?.[0]?.count || 0,
    profile: {
      id: el.profile_id,
      username: el.profiles.username,
      avatarUrl: el.profiles.avatar_url ? (el.profiles.avatar_url + '?lastMod=' + new Date()) : ''
    },
    tags: el.tag_x_post.map(el => el.tag)
  }))
}

export function readOneAdapterRpc(value: ReadOnePostRow | null): PostDetail | null {
  if(!value[0]) return null

  return {
    id: value[0].id,
    title: value[0].title,
    isDraft: value[0].is_draft,
    code: value[0].code,
    createdAt: new Date(value[0].created_at),
    coverImageUrl: value[0].cover_image_url,
    profile: {
      id: value[0].profile_id,
      username: value[0].username,
      avatarUrl: value[0].avatar_url ? (value[0].avatar_url + '?lastMod=' + new Date()) : ''
    },
    description: value[0].description,
    likes: value[0].likes,
    liked: value[0].liked
  }
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
    description: value.description,
    likes: value.likes?.[0]?.count || 0,
    liked: false
  }
}

export function readAllCommentsAdapter(values: ReadAllComments | null): CommentType[] | [] {
  if(!values) return []

  return values.map(el => ({
    id: el.id,
    description: el.description,
    createdAt: new Date(el.created_at),
    profile: {
      id: el.profile_id,
      username: el.username,
      avatarUrl: el.avatar_url
    },
    commentId: el.comment_id,
    comments: [],
    liked: el.liked,
    likes: el.likes
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
    profileId: value.profile_id,
    description: JSON.parse(value.description)
  }
}