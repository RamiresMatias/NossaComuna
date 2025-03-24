<template>
  <p class=" text-gray-800 text-regular xl:p-0 px-4">Redirecionando...</p>
</template>

<script setup lang="ts">

const router = useRouter()

const navigateToPanel = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  router.push('/')
}

onMounted(() => {
  navigateToPanel()
})
</script>