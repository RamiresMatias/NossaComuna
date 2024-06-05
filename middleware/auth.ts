import {useSession} from '@/modules/auth/composables/useSession/useSession'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const session = useSession()

  if(!session.isLogged()) {
    console.log('user not authenticated')
    if(to.path === '/auth/login') return

    return navigateTo({ path: '/auth/login' })
  }
})