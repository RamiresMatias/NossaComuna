<template>
  <div class="rounded-lg p-5 bg-white overflow-x-inherit">
    <div v-if="props.title" class="flex justify-between items-center mb-2">
      <div class="flex flex-col gap-1">
        <h3 class=" text-lg font-bold text-left text-gray-700">{{ props.title }}</h3>
        <p v-if="props.subTitle" class=" text-sm text-gray-500 text-left">{{ props.subTitle }}</p>
      </div>
      <slot name="header-actions"></slot>
    </div>
    <div class="py-2">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string
  subTitle?: string
}>()
</script>