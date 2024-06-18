<template>
  <PostCreate is-edit />
</template>

<script setup lang="ts">
import PostCreate from '@/modules/posts/screens/PostCreate.vue'

definePageMeta({
  middleware: ['auth']
})
</script>