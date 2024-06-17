<template>
  <div class="w-full flex gap-2">
    <Avatar :image="profilePic" shape="circle" />
    <div class="flex flex-col gap-2 flex-1">
      <Textarea v-model="description" autoResize rows="4" class="" placeholder="Insira seu comentário aqui" />
      <div>
        <Button 
          label="Comentar"
          :loading="loading"
          :disabled="!description"
          size="small"
          @click="emit('submit-comment')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  profilePic: string
  loading: boolean
}>()

const description = defineModel<string>('')

const emit = defineEmits<{
  (e: 'submit-comment'): void
}>()

</script>

<style scoped>

</style>