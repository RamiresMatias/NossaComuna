import { myselfKey, useMyself } from "@/modules/users/composables/useMyself/useMyself"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const myself = useMyself()
  if(!myself.user.value?.id) {
    if(to.path === '/auth') return

    return navigateTo('/auth')
  }
})