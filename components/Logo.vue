<template>
  <div class="flex items-center gap-1 select-none">
    <span :class="{
      'text-xl': size === 'small',
      'text-2xl': size === 'default',
      'text-5xl': size === 'xl'
    }">👨‍💻</span>
    <h1 
      class=" font-bold text-gray-700 text-lg md:text-xl"
      :class="{
        'md:text-lg': size === 'small',
        'md:text-xl': size === 'default',
        'md:text-4xl': size === 'xl'
      }"
    >NossaComuna</h1>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    size: 'small' | 'xl' | 'default'
  }>(),
  {
    size: 'default'
  }
)
</script>