<template>
  <Posts />
</template>

<script setup lang="ts">
import Posts from '@/modules/posts/screens/Posts.vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

definePageMeta({
  layout: 'default'
})

onMounted(() => {
  console.log(userStore);
  console.log(userStore.count);
  console.log(userStore.increment());
})
</script>