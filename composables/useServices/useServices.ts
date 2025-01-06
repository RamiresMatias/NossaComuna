import AuthService from '@/modules/auth/services/services'
import UserServices from '@/modules/users/services/services'
import PostServices from '@/modules/posts/services/services'
import TagServices from '@/modules/tag/services/services'

import type { Database } from '@/libs/supabase/schema'

export function useServices() {

  const supabaseClient = useSupabaseClient<Database>()
  const { $httpClient } = useNuxtApp()

  return {
    auth: AuthService($httpClient),
    users: UserServices(supabaseClient),
    post: PostServices($httpClient),
    tag: TagServices($httpClient)
  }
}