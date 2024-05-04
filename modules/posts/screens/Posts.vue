<template>
  <Widget title="Posts Recentes">
    <div class="flex flex-col w-full h-full gap-4">
      <Post 
        v-for="item in 10" 
        :key="item" 
        :total-likes="Math.round(Math.random() * 100)"
        :total-comments="Math.round(Math.random() * 100)"
      />
    </div>
  </Widget>
</template>

<script setup lang="ts">
import Post from '@/modules/posts/components/Post.vue'
</script>