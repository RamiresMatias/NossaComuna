<template>
  <div class="w-full flex flex-col gap-2">
    <div class="w-full flex gap-2">
      <NuxtImg
        :src="props.profile.avatarUrl + '?c=' + new Date()"
        alt="Avatar do usuário"
        class="w-8 h-8 rounded-full"
        loading="lazy"
        decoding="auto"
        format="webp"
      />
      <div class="w-full flex flex-col">
        <section class="w-full border border-solid border-gray-200 rounded-md flex flex-col p-2">
          <div class="flex gap-2 w-full items-center justify-start mb-4">
            <span class="text-base text-[#3d3d3d] ">{{ props.profile.username }}</span>
            <span class="text-xs text-gray-400 ">• {{ new Date(props.createdAt).toLocaleDateString('pt-br') }}</span>
            <span v-if="isAuthor"class="ml-auto">
              <i 
                class="pi pi-ellipsis-h cursor-pointer text-neutral-500" 
                @click="toggle"
                aria-haspopup="tree" 
                aria-controls="comment-options"
              ></i>
            </span>
          </div>
          <p class="text-sm md:text-base text-pretty text-left w-full  font-normal">
            {{ props.content }}
          </p>
        </section>
        <div class="flex items-center gap-2 justify-start py-2 flex-wrap">
          <Button 
            :label="`${likes} Curtidas`" 
            icon="pi pi-thumbs-up" 
            icon-pos="left" 
            everity="secondary" 
            text 
            size="small" 
            class="text-xs"
            @click="emit('on-like', props.id)"
          />
          <Button 
            label="Responder" 
            icon="pi pi-comments" 
            icon-pos="left" 
            everity="secondary" 
            text 
            size="small" 
            class="text-xs"
            @click="isReply = !isReply"
          />
        </div>
        <Menu ref="menu" :model="items" popup></Menu>
      </div>
    </div>
    <div class="box-border" :class="{'ml-10': level !== 1}">
      <CreateComment 
        v-if="isReply" 
        v-model="reply" 
        :profile-pic="user.avatarUrl" 
        :loading="false"
        placeholder="Responder..."
        show-cancel
        class="mt-4"
        @submit-comment="handleReply"
        @cancel="isReply = false"
      />
      <Comment
        v-for="reply in comments" 
        :key="reply.id"
        :content="reply.content"
        :profile="reply.profile"
        :created-at="reply.createdAt"
        :id="reply.id"
        :is-author="reply.profile.id === user?.id"
        :comments="reply.comments"
        class="mt-4"
        :level="1"
        :liked="reply.liked"
        :likes="reply.likes"
        @delete="(id) => emit('delete', id)"
        @on-reply="(reply) => emit('on-reply', reply)"
        @on-like="(id) => emit('on-like', id)"
      ></Comment>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CommentType } from '@/types'

import Comment from '@/modules/posts/components/Comment.vue'

import { myselfKey, type MyselfContextProvider } from '@/modules/users/composables/useMyself/useMyself'

const { user } = inject(myselfKey) as MyselfContextProvider

interface CommentProps extends CommentType {
  isAuthor: boolean
  level?: number
}

const props = withDefaults(
  defineProps<CommentProps>(),
  {
    id: '',
    content: `Seeing those example file structures is extremely helpful! In a way, I already used the Atomic Design approach without the molecules level. Depending on the project size, I guess it's fine to skip one level.`,
    profile: () => Object.create({username: 'Klebin', avatarUrl: 'https://i.ibb.co/VwpJcdH/1ca5d6cede414702a3fd2eeb12bb68b8.jpg'}),
    createdAt: () => new Date(),
    isAuthor: false,
    comments: () => []
  }
)

const emit = defineEmits<{
  (e: 'delete', id: string): void,
  (e: 'on-reply', {comment, commentId}: {comment: string, commentId: string}): void,
  (e: 'on-like', id: string): void
}>()

const reply = ref()
const isReply = ref(false)
const menu = ref()
const items = [
  {
    label: 'Deletar',
    command: () => emit('delete', props.id),
    disabled: props.comments.length > 0
  }
]

const handleReply = () => {
  emit('on-reply', {comment: reply.value, commentId: props.id})
}

const toggle = (event: Event) => {
  menu.value?.toggle(event)
}
</script>
