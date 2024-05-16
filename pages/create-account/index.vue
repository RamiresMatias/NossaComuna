<template>
  <CreateAccount />
</template>

<script setup lang="ts">
import CreateAccount from '@/modules/users/screens/CreateAccount.vue'

definePageMeta({
  layout: 'auth'
})
</script>