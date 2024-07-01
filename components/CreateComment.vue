<template>
  <div class="w-full flex gap-2">
    <Avatar :image="profilePic" shape="circle" />
    <div class="flex flex-col gap-2 flex-1">
      <Textarea v-model="description" autoResize rows="4" class="" :placeholder="placeholder ?? 'Insira seu comentário aqui'" />
      <div class="flex gap-2">
        <Button 
          label="Comentar"
          :loading="loading"
          :disabled="!description"
          size="small"
          @click="emit('submit-comment')"
        />
        <Button 
          v-if="showCancel"
          label="Cancelar"
          :loading="loading"
          size="small"
          severity="secondary"
          outlined
          @click="emit('cancel')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  profilePic: string
  loading: boolean
  placeholder?: string
  showCancel?: boolean
}>()

const description = defineModel<string>()

const emit = defineEmits<{
  (e: 'submit-comment'): void,
  (e: 'cancel'): void,
}>()

</script>

<style scoped>

</style>