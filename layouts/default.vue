<template>
  <div class="w-full h-full flex flex-col items-center">
    <MainContent>
      <template #header>
        <Header @authenticate="handleAuth" @navigate-to-post-create="handlePostCreate" />
      </template>
      <template #content>
        <slot></slot>
      </template>
    </MainContent>
  </div>
</template>

<script lang="ts" setup>

const router = useRouter()

const handleAuth = () => {
  console.log('handleAuth');
}

const handlePostCreate = () => router.push('/posts/create')
</script>