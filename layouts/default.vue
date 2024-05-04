<template>
  <div class="w-full h-full flex flex-col items-center">
    <MainContent>
      <template #header>
        <Header @authenticate="handleAuth" />
      </template>
      <template #content>
        <slot></slot>
      </template>
    </MainContent>
  </div>
</template>

<script lang="ts" setup>
const handleAuth = () => {
  console.log('handleAuth');
}
</script>