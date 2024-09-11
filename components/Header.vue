<template>
  <header class="w-full shadow">
    <nav class="bg-white px-4 lg:px-6 py-2.5">
      <div class="flex justify-between items-center mx-auto max-w-[1380px]">
        <NuxtLink to="/posts" :prefetch="false">
          <Logo size="default" />
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
        <Button 
          icon-pos="right"
          icon="pi pi-bars"
          outlined
          text
          @click="menu = !menu"
          class="static md:hidden"
        />
        <Sidebar v-model:visible="menu" header="Menu" position="right">
          <div class="flex flex-col w-full gap-4 items-start justify-center">
            <Button label="Novo post" link />
            <Button label="Login" link />
          </div>
        </Sidebar>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">

const menu = ref(false)

const emit = defineEmits<{
  (e: 'authenticate'): void
  (e: 'navigate-to-post-create'): void
}>()
</script>