import type { ReadAllTags, Tag } from "~/types"

export function readAllAdapter(value: ReadAllTags[]): Tag[] {
  if (!value) return null

  return value.map(el => ({
    id: el.id,
    description: el.description,
    createdAt: el.created_at
  }))
}