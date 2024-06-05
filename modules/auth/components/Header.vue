<template>
  <header class="w-full shadow">
    <nav class="bg-white px-4 lg:px-6 py-2.5">
      <div class="flex justify-between items-center mx-auto max-w-screen-xl">
        <div class="flex items-center">
          <NuxtLink to="/posts">
            <Logo />
          </NuxtLink>
        </div>
        <div class="flex items-center">
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
  (e: 'navigate-to-new-gist'): void
  (e: 'navigate-to-profile-edit'): void
  (e: 'navigate-to-sales'): void
  (e: 'navigate-to-reports'): void
  (e: 'logout'): void
}>()

const props = defineProps<{
  profilePic?: string
  nickname: string
}>()

const menu = ref()

const items = [
  {
    label: 'Painel',
    icon: 'pi pi-chart-line',
    command: () => emit('navigate-to-reports')
  },
  {
    label: 'Novo Gist',
    icon: 'pi pi-plus',
    command: () => emit('navigate-to-new-gist')
  },
  {
    label: 'Editar perfil',
    icon: 'pi pi-user',
    command: () => emit('navigate-to-profile-edit')
  },
  {
    label: 'Vendas',
    icon: 'pi pi-money-bill',
    command: () => emit('navigate-to-sales')
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