<template>
  <div class="w-full h-full flex flex-col relative">
    <div class="w-full sticky top-0 z-10">
      <slot class="flex-1" name="header" />
    </div>
    <div ref="containerContentRef" class="bg-slate-100 w-full h-max flex-1 overflow-y-auto">
      <div class="w-full h-full py-5 mx-auto max-w-[1380px]">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const containerContentRef = ref<HTMLDivElement>()

provide<Ref<HTMLDivElement>>('containerContentRef', containerContentRef)
</script>

<style scoped>

</style>