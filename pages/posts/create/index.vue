<template>
  <PostCreate />
</template>

<script setup lang="ts">
import PostCreate from '@/modules/posts/screens/PostCreatev2.vue'

definePageMeta({
  middleware: ['auth']
})
</script>