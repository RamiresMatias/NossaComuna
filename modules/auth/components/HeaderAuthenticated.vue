<template>
  <header class="w-full shadow">
    <nav class="bg-white px-4 lg:px-6 py-2.5">
      <div class="flex justify-between items-center mx-auto max-w-screen-xl">
        <div class="flex items-center">
          <NuxtLink to="/posts">
            <Logo />
          </NuxtLink>
        </div>
        <div class="flex items-center gap-4">
          <Button 
            label="Novo post" 
            severity="secondary" 
            text
            icon-pos="right"
            icon="pi pi-plus"
            @click="() => emit('navigate-to-post-create')"
          />
          <button class="flex gap-2 items-center" aria-haspopup="tree" aria-controls="header-auth-menu" @click="toggle">
            <Avatar v-if="props.profilePic" :image="props.profilePic" shape="circle" />
            <Avatar v-else icon="pi pi-user" style="background-color: #dee9fc; color: #1a2551" shape="circle" />
          </button>
        </div>

        <Menu ref="menu" :model="items" popup></Menu>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">

const emit = defineEmits<{
  (e: 'navigate-to-edit-profile'): void
  (e: 'logout'): void
  (e: 'navigate-to-post-create'): void
}>()

const props = defineProps<{
  profilePic?: string
  nickname: string
}>()

const menu = ref()

const items = [
  {
    label: 'Meu perfil',
    icon: 'pi pi-user',
    command: () => emit('navigate-to-edit-profile')
  },
  {
    separator: true
  },
  {
    label: 'Sair',
    icon: 'pi pi-sign-out',
    command: () => emit('logout')
  }
]

const toggle = (event: Event) => {
  menu.value?.toggle(event)
}
</script>