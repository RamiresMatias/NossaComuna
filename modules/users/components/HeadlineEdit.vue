<template>
  <div class="w-full flex flex-col justify-center items-center gap-2">
    <div class="w-24 md:w-32 rounded-full overflow-hidden flex items-center justify-center">
      <img v-if="props.avatarUrl" :src="props.avatarUrl" alt="Foto de perfil do usuário" />
      <i v-else class="pi pi-user rounded-full bg-slate-300 text-6xl p-6"></i>
    </div>
    <h1 class=" text-gray-700 font-bold text-2xl md:text-3xl">@{{ props.username }}</h1>
    <div class="flex gap-2 mt-2 flex-wrap items-center justify-center">
      <Button 
        label="Ver perfil"
        size="small"
        icon="pi pi-star"
        icon-pos="right"
        @click="() => emit('navigate-to-profile', props.username)" 
      />
      <Button 
        label="Compartilhar"
        size="small"
        icon="pi pi-share-alt"
        icon-pos="right"
        @click="() => emit('share', props.username)" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'share', username: string): void
  (e: 'navigate-to-profile', username: string): void
}>()

const props = defineProps<{
  username: string
  avatarUrl: string
}>()
</script>