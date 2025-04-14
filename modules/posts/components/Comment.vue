<template>
  <div class="w-full flex flex-col gap-2 border-b border-b-solid border-b-gray-200">
    <div class="w-full flex gap-2">
      <NuxtImg
        :src="props.avatarUrl"
        alt="Avatar do usuário"
        class="rounded-full"
        height="40px"
        width="40px"
        loading="lazy"
        decoding="auto"
      />
      <div class="flex flex-col gap-1">
        <span class="text-sm font-medium">{{ props.username }}</span>
        <span class="text-xs text-gray-500">{{ props.createdAt }}</span>
      </div>
    </div>
    <div class="w-full flex flex-col gap-2">
      <p class="text-pretty text-left w-full font-normal text-gray-700">
        {{ props.content }}
      </p>
      <div class="flex items-center gap-2 justify-start py-2 flex-wrap w-full">
        <Button 
          :label="`${likes}`" 
          :icon="props.liked ? 'pi pi-thumbs-up-fill' : 'pi pi-thumbs-up'" 
          icon-pos="left" 
          severity="secondary" 
          text 
          size="small" 
          class="text-xs"
          @click="props.liked ? emit('on-deslike', props.id) : emit('on-like', props.id)"
        />
        <Button 
          label="Responder" 
          icon="pi pi-comments" 
          icon-pos="left" 
          severity="secondary" 
          text 
          size="small" 
          class="text-xs"
          @click="isReply = !isReply"
        />
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
        :created-at="reply.createdAt"
        :username="reply.username"
        :avatar-url="reply.avatarUrl"
        :email="reply.email"
        :id="reply.id"
        :is-author="reply.profileId === user?.id"
        :comments="reply.comments"
        class="mt-4"
        :level="1"
        :liked="reply.liked"
        :likes="reply.likes"
        @delete="(id) => emit('delete', id)"
        @on-reply="(reply) => emit('on-reply', reply)"
        @on-like="(id) => emit('on-like', id)"
        @on-deslike="(id) => emit('on-deslike', id)"
      ></Comment>
    </div>
  </div>
</template>

<script setup lang="ts">
import Comment from '@/modules/posts/components/Comment.vue'

import { myselfKey, type MyselfContextProvider } from '@/modules/users/composables/useMyself/useMyself'
import type { ICommentPost } from '../types/post'

const { user } = inject(myselfKey) as MyselfContextProvider

interface CommentProps extends ICommentPost {
  isAuthor: boolean
  level?: number
}

const props = defineProps<CommentProps>()

const emit = defineEmits<{
  (e: 'delete', id: string): void,
  (e: 'on-reply', {comment, commentId}: {comment: string, commentId: string}): void,
  (e: 'on-like', id: string): void,
  (e: 'on-deslike', id: string): void
}>()

const reply = ref()
const isReply = ref(false)
const menu = ref()
const items = [
  {
    label: 'Deletar',
    command: () => emit('delete', props.id),
    disabled: props?.comments?.length > 0
  }
]

const handleReply = () => {
  emit('on-reply', {comment: reply.value, commentId: props.id})
}

const toggle = (event: Event) => {
  menu.value?.toggle(event)
}
</script>
