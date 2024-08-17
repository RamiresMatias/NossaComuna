import type { ReadAllPostTags, ReadAllTags, Tag } from "~/types"

export function readAllAdapter(value: ReadAllTags[]): Tag[] {
  if (!value) return []

  return value.map(el => ({
    id: el.id,
    description: el.description,
    createdAt: el.created_at
  }))
}

export function readAllPostTagsAdapter(value: ReadAllPostTags[]): Tag[] {
  if (!value) return []

  return value.map(el => ({
    id: el.tag.id,
    description: el.tag.description,
  }))
}