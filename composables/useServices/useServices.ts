import AuthService from '@/modules/auth/services/services'

import type { Database } from '@/libs/supabase/schema'
import axios from 'axios'

export function useServices() {

  const supabaseClient = useSupabaseClient<Database>()
  const config = useRuntimeConfig()

  return {
    auth: AuthService(supabaseClient, {
      redirectUrl: `${config.public.siteUrl}/auth/github`
    }),
  }
}