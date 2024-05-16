<template>
  <div class="w-full flex flex-col gap-4">
    <Button 
      label="Criar com G-mail" 
      severity="secondary"
      outlined
      icon="pi pi-google"
      icon-pos="left"
      icon-class="text-red-500"
      @click="emit('on-create-gmail')"
    />
    <Button 
      label="Criar com Github" 
      severity="secondary"
      icon="pi pi-github"
      outlined
      icon-pos="left"
      @click="emit('on-create-github')"
    />
    <Button 
      label="Criar com E-mail" 
      severity="secondary"
      icon="pi pi-envelope"
      outlined
      icon-pos="left"
      @click="emit('on-create-email')"
    />
  </div>
</template>

<script setup lang="ts">

const emit = defineEmits<{
  (e: 'on-create-gmail'): void
  (e: 'on-create-github'): void
  (e: 'on-create-email'): void
}>()

</script>

<style scoped>

</style>