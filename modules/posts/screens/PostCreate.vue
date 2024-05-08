<template>
  <div class="w-full h-full max-w-screen-md mx-auto">
    <div class="w-full h-full bg-white p-5 flex flex-col gap-6 rounded-md">
      <div>
        <Button 
          label="Add imagem de capa" 
          severity="secondary"
          icon="pi pi-plus"
          icon-pos="right"
          outlined
          size="small"
        />
      </div>
      <div class="w-full h-full flex flex-col gap-6">
        <textarea 
          ref="titleRef"
          id="title-post"
          type="text" 
          class="w-full font-bold text-xl md:text-5xl placeholder:text-gray-700 p-2 border-none outline-none rounded-md
          resize-none overflow-hidden" 
          placeholder="Titulo do post aqui"
          :style="{'height': `${heightTextarea}px`}"
          @input="handleTitle"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const titleRef = ref<HTMLTextAreaElement>()

const form = reactive<{
  description: string
}>({
  description: ''
})

const limitLines = 80

const heightTextarea = computed(() => titleRef.value ? Math.min(titleRef.value.scrollHeight, limitLines) : 0)

const handleTitle = () => {
  // if (!titleRef.value) return

  // const el = document.getElementById('title-post')

  // if (el) {
  //   el.style.height = `${Math.min(titleRef.value.scrollHeight, limitLines)}px`
  // }
}
</script>