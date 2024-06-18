<template>
  <div class="w-full flex gap-2">
    <img :src="props.profile.avatarUrl" alt="Avatar do autor do comentário" class="w-8 h-8 rounded-full" />
    <div class="w-full flex flex-col">
      <section class="w-full border border-solid border-gray-200 rounded-md flex flex-col p-2">
        <div class="flex gap-2 w-full items-center justify-start mb-4">
          <span class="text-base text-[#3d3d3d] font-[Inter]">{{ props.profile.username }}</span>
          <span class="text-xs text-gray-400 font-[Inter]">• {{ new Date(props.createdAt).toLocaleDateString('pt-br') }}</span>
          <span class="ml-auto">
            <i 
              class="pi pi-ellipsis-h cursor-pointer text-neutral-500" 
              @click="toggle"
              aria-haspopup="tree" 
              aria-controls="comment-options"
            ></i>
          </span>
        </div>
        <p class="text-sm md:text-base text-pretty text-left w-full font-[Inter] font-normal">
          {{ props.description }}
        </p>
      </section>
      <div class="flex items-center gap-2 justify-start py-2 flex-wrap">
        <Button label="Likes" icon="pi pi-thumbs-up" icon-pos="left" everity="secondary" text size="small" class="text-xs" />
        <Button label="Comentários" icon="pi pi-comments" icon-pos="left" everity="secondary" text size="small" class="text-xs" />
      </div>
      <Menu ref="menu" :model="items" popup></Menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CommentType } from '@/types'

interface CommentProps extends CommentType {
  isAuthor: boolean
}

const props = withDefaults(
  defineProps<CommentProps>(),
  {
    id: '',
    description: `Seeing those example file structures is extremely helpful! In a way, I already used the Atomic Design approach without the molecules level. Depending on the project size, I guess it's fine to skip one level.`,
    profile: () => Object.create({username: 'Klebin', avatarUrl: 'https://i.ibb.co/VwpJcdH/1ca5d6cede414702a3fd2eeb12bb68b8.jpg'}),
    createdAt: () => new Date(),
    isAuthor: false
  }
)

const emit = defineEmits<{
  (e: 'delete', id: string): void
}>()

const menu = ref()
const items = [
  {
    label: 'Deletar',
    command: () => emit('delete', props.id)
  }
]

const toggle = (event: Event) => {
  menu.value?.toggle(event)
}
</script>
