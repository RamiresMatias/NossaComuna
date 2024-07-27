<template>
  <div class="grid grid-cols-12 gap-x-2">
    <div class="lg:col-span-4 bg-white rounded-md p-4 shadow-md">
      profile
    </div>
    <div class="lg:col-span-8 bg-white rounded-md p-4 shadow-md">

    </div>
    <div class="lg:col-span-4 bg-white rounded-md p-4 shadow-md">

    </div>
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