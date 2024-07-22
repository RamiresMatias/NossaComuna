<template>
  <div>
    teste
  </div>
</template>

<script setup lang="ts">
import type { Profile } from '@/types'

const services = useServices()
const route = useRoute()

const profile = reactive<Profile>({
  id: '',
  createdAt: null,
  email: '',
  avatarUrl: '',
  bio: '',
  username: ''
})

const loading = ref(false)

const getProfileDetails = async () => {
  const username = route.params.username as string

  if (!username) {
    return navigateTo('/404')
  }
  try {
    loading.value = true
    const data = await services.users.getUserByUsername(username)
    Object.assign(profile, data)

    await sleep(1000)

    loading.value = false
  } catch (error) {
    console.log(error);
    loading.value = false
  }
}

onMounted(() => getProfileDetails())
</script>

<style scoped>

</style>