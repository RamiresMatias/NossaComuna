<template>
  <div class="w-full h-screen flex flex-col">
    <slot class="flex-1" name="header" />
    <div class="bg-gray-50 w-full h-max flex-1">
      <div class="w-full h-full mx-auto">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    maxLarge?: boolean
  }>(),
  {
    maxLarge: false
  }
)
</script>

<style scoped>

</style>