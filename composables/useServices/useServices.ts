import AuthService from '@/modules/auth/services/services'
import UserServices from '@/modules/users/services/services'
import PostServices from '@/modules/posts/services/services'
import TagServices from '@/modules/tag/services/services'

import type { Database } from '@/libs/supabase/schema'

export function useServices() {

  const supabaseClient = useSupabaseClient<Database>()
  const config = useRuntimeConfig()

  return {
    auth: AuthService(supabaseClient, {
      redirectUrl: `${config.public.siteUrl}/auth/github`
    }),
    users: UserServices(supabaseClient),
    post: PostServices(supabaseClient),
    tag: TagServices(supabaseClient)
  }
}