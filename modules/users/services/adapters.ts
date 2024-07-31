import type { Database } from "@/libs/supabase/schema"
import type { User } from '@/types/index'

type ProfileTable = Database['public']['Tables']['profiles']
type Row = ProfileTable['Row']

export function getMySelfAdapter(data: Row | null): User | null {
  if(!data) return null

  return {
    id: data.id,
    avatarUrl: data.avatar_url ? (data.avatar_url + '?lastMod=' + new Date()) : '',
    username: data.username || undefined,
    createdAt: new Date(data.created_at),
    bio: data.bio || undefined,
    email: data.email,
  }
}