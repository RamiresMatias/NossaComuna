<template>
  <header class="w-full shadow">
    <nav class="bg-white px-4 lg:px-6 py-2.5">
      <div class="flex justify-center md:justify-between items-center mx-auto max-w-screen-lg">
        <NuxtLink to="/">
          <Logo />
        </NuxtLink>
        <div class="hidden md:flex items-center gap-5">
          <Button 
            label="Novo post" 
            severity="secondary" 
            text
            icon-pos="right"
            icon="pi pi-plus"
            @click="() => emit('navigate-to-post-create')"
          />
          <Button 
            label="Login"
            icon-pos="right"
            icon="pi pi-arrow-right"
            outlined
            @click="() => emit('authenticate')"
          />
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">

const emit = defineEmits<{
  (e: 'authenticate'): void
  (e: 'navigate-to-post-create'): void
}>()
</script>