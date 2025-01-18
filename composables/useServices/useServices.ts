import AuthService from '@/modules/auth/services/services'
import UserServices from '@/modules/users/services/services'
import PostServices from '@/modules/posts/services/services'
import TagServices from '@/modules/tag/services/services'

export function useServices() {

  const { $httpClient } = useNuxtApp()

  return {
    auth: AuthService($httpClient),
    users: UserServices($httpClient),
    post: PostServices($httpClient),
    tag: TagServices($httpClient)
  }
}