<template>
  <div class="p-1 box-border h-full text-primary-300 text-sm font-regular rounded-md flex items-center justify-center gap-1">
    <slot name="icon" />
    <span class="text-inherit">{{ count }}</span>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  count: number
}>(), {
  count: 0
})
</script>