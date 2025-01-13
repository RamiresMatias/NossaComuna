import { useMyself } from "@/modules/users/composables/useMyself/useMyself"

export default defineNuxtRouteMiddleware(async (to, from) => {

  const { user } = useMyself()

  if(!user.value?.id && to.path !== from.path) {
    if(to.path === '/auth') return

    return navigateTo('/auth')
  }
  return
})