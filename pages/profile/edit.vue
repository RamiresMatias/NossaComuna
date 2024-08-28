<template>
  <EditProfile />
</template>

<script setup lang="ts">
import EditProfile from '@/modules/users/screens/EditProfile.vue'

definePageMeta({
  middleware: ['auth'],
  layout: 'default'
})
</script>