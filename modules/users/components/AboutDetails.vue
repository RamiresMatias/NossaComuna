<template>
  <div class="flex flex-col w-full gap-6 p-2">
    <div class="text-slate-500 font-medium">{{ bio }}</div>
    <div class="w-full flex gap-10 items-center">
      <div class="flex flex-col gap-2 items-start">
        <label class="font-semibold">Seguidores</label>
        <div class="text-slate-500">{{ followers }}</div>
      </div>
      <div class="flex flex-col gap-2 items-start">
        <label class="font-semibold">Seguindo</label>
        <div class="text-slate-500">{{ 70 }}</div>
      </div>
      <div class="flex flex-col gap-2 items-start">
        <label class="font-semibold">Se juntou em</label>
        <div class="text-slate-500">{{ new Date().toLocaleDateString('pt-br') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  bio: string
  followers: number
  following: any[]
}>()
</script>

<style scoped>

</style>