<template>
  <header ref="headerRef" class="w-full shadow">
    <nav class="bg-white px-4 lg:px-6 py-2.5">
      <div class="flex justify-center sm:justify-between items-center mx-auto max-w-[1380px]">
        <div class="flex items-center flex-1 justify-center sm:justify-start">
          <NuxtLink to="/" :prefetch="false">
            <Logo size="default" />
          </NuxtLink>
        </div>
        <div class="hidden sm:flex items-center gap-2">
          <Button 
            label="Novo post" 
            severity="secondary" 
            text
            size="small"
            icon-pos="right"
            icon="pi pi-plus"
            @click="() => emit('navigate-to-post-create')"
          />
          <button size="small" class="flex items-center h-[40px] w-[40px]" aria-haspopup="tree" aria-label="Menu do perfil" aria-controls="header-auth-menu" @click="toggle">
            <NuxtImg
              v-if="props.profilePic"
              :src="props.profilePic"
              alt="Avatar do usuário"
              class="rounded-full h-full w-full object-cover"
              loading="lazy"
              decoding="auto"
              format="webp"
              quality="20"
            />
            <div v-else class="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 text-slate-600">
              <i class="pi pi-user"></i>
            </div>
          </button>
        </div>
        <Button
          text
          icon="pi pi-bars"
          @click="toggleHamburguer"
          class="flex sm:hidden ml-auto"
        ></Button>

        <Menu ref="menu" :model="items" popup></Menu>
        <Menu ref="menuHamburguer" popup :model="items" class="">
          <template #start>
            <div class="flex items-center gap-2 pr-2 pl-4 m-0 border-b border-b-neutral-100 border-b-solid pb-2">
              <Avatar v-if="props.profilePic" :image="props.profilePic" shape="circle" />
              <Avatar v-else icon="pi pi-user" style="background-color: #dee9fc; color: #1a2551" shape="circle" />
              <span>{{ props.nickname }}</span>
            </div>
          </template>
          <template #item="{ item, props }">
            <a v-ripple class="flex items-center gap-2" v-bind="props.action">
              <span :class="item.icon" />
              <span>{{ item.label }}</span>
            </a>
          </template>
        </Menu>
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
  loading?: boolean
  nickname: string
}>()

const menu = ref()
const menuHamburguer = ref()
const headerRef = ref<HTMLHeadElement>()

const resizeMobile = computed(() => headerRef.value ? (headerRef.value.offsetWidth < 640) : false)

const items = computed(() => {

  return [
    (
      resizeMobile.value ? {
        label: 'Novo post',
        icon: 'pi pi-plus',
        command: () => emit('navigate-to-post-create')
      } : {}
    ),
    {
      label: 'Meu perfil',
      icon: 'pi pi-user',
      command: () => emit('navigate-to-edit-profile')
    },
    {
      label: 'Sair',
      icon: 'pi pi-sign-out',
      command: () => emit('logout')
    }
  ].filter(el => el.label)
})

const toggle = (event: Event) => {
  menu.value?.toggle(event)
}

const toggleHamburguer = (event: Event) => {
  menuHamburguer.value?.toggle(event)
}
</script>

<style scoped lang="scss">

</style>