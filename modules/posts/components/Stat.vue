<template>
  <div class="p-1 box-border h-full text-inherit text-sm  rounded-md flex items-center justify-center gap-1">
    <slot name="preffix" />
    <span class="text-inherit">{{ count }}</span>
    <slot name="suffix" />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  count: number
}>(), {
  count: 0
})
</script>