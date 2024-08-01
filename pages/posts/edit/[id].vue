<template>
  <PostEdit />
</template>

<script setup lang="ts">
import PostEdit from '@/modules/posts/screens/PostEdit.vue'

definePageMeta({
  middleware: ['auth']
})
</script>