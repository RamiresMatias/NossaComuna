<template>
  <div class="w-full h-full">
    <MainContent>
      <template #content>
        <div class="w-full h-full rounded-md shadow-sm">
          <img src="" alt="Imagem de capa" />
        </div>
      </template>
    </MainContent>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const route = useRoute()

const getPost = async () => {
  const { username, post } = route.params as {username: string, post: string}
  
  
}

onMounted(() => getPost())
</script>