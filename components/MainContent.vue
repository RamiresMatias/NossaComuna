<template>
  <div class="w-full h-full flex flex-col">
    <slot class="flex-1" name="header" />
    <div class="bg-[--body-color] w-full h-max flex-1">
      <div class="w-full h-full py-5 mx-auto max-w-[1380px]">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>