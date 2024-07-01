<template>
  <p class=" text-gray-800 text-regular">Redirecionando...</p>
</template>

<script setup lang="ts">

const router = useRouter()

const navigateToPanel = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  router.push('/posts')
}

onMounted(() => {
  navigateToPanel()
})
</script>