import {useSession} from '@/modules/auth/composables/useSession/useSession'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const session = useSession()

  if(!session.isLogged()) {
    if(to.path === '/auth') return

    return navigateTo('/auth')
  }
})