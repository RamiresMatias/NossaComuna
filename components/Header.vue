<template>
  <header class="w-full shadow-sm border-b border-solid border-b-gray-200">
    <nav class="bg-white px-4 lg:px-6 py-2.5">
      <div class="flex justify-between items-center mx-auto max-w-[1380px]">
        <NuxtLink to="/" :prefetch="false">
          <Logo size="default" />
        </NuxtLink>
        <div class="hidden md:flex items-center gap-5">
          <Button label="Login" size="small" text @click="() => emit('authenticate')" />
          <Button 
            label="Criar uma conta"
            size="small"
            @click="() => emit('create-account')"
          />
        </div>
        <Button 
          icon-pos="right"
          icon="pi pi-bars"
          outlined
          text
          size="small"
          @click="menu = !menu"
          class="static md:hidden"
        />
        <Sidebar v-model:visible="menu" header="Menu" position="right">
          <div class="flex flex-col w-full gap-4 items-start justify-center">
            <Button label="Login" link />
            <Button label="Criar uma conta" link @click="() => emit('create-account')" />
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
  (e: 'create-account'): void
}>()
</script>