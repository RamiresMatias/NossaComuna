<template>
  <div class="grid grid-cols-12 w-full max-w-screen-xl">
    <div v-if="isAuthorPost" class="col-span-1 hidden md:flex flex-col items-center m-0 p-0">
      <Button 
        icon="pi pi-pencil" 
        severity="contrast" 
        text 
        rounded 
        aria-label="Editar" 
        v-tooltip="{ value: 'Editar post', showDelay: 1000, hideDelay: 300 }" 
        @click="navigateToEdit"
      />
    </div>
    <PostDetailLoading v-if="loading || pending" class="col-span-11" />
    <article v-else class="w-full h-full mx-auto bg-white rounded-md flex flex-col col-span-full md:col-span-9">
      <img v-if="post.coverImageUrl" :src="post.coverImageUrl + '?c='" alt="Imagem de capa do post" class="w-full h-full max-h-[400px] object-cover rounded-t-md mb-8" />
      <section class="w-full h-full flex flex-col max-w-[80%] mx-auto" :class="{'mt-8': !post.coverImageUrl}">
        <div class="flex w-full py-4 gap-2">
          <img :src="post.profile.avatarUrl" alt="Foto de perfil do usuário" class="rounded-full w-12 h-12" />
          <div class="w-full h-full flex flex-col flex-1 gap-1">
            <p class=" text-base lg:text-lg text-[--title-color] font-[700] text-balance font-[Inter]">
              {{ post.profile.username }}
            </p>
            <p class="text-xs font-[Inter] font-regular text-gray-500">
              Postado em {{ new Date(post.createdAt).toLocaleDateString('pt-br') }}
            </p>
          </div>
        </div>
        <div class="w-full flex gap-4 mb-10">
          <Stat :count="post.totalLikes" class="text-lg">
            <template #icon>
              <i class="pi pi-heart-fill text-lg"></i>
            </template>
          </Stat>
          <Stat :count="post.totalComments" class="text-lg">
            <template #icon>
              <i class="pi pi-comments text-lg"></i>
            </template>
          </Stat>
        </div>
        <h1 class="text-4xl font-bold text-pretty tracking-wide font-[Inter] mb-6">
          {{ post.title }}
        </h1>
        <Editor
          v-if="post.description"
          v-model="post.description"
          readonly
          class="editor-post"
        />
      </section>
      <div class="w-full h-[2px] bg-gray-200"></div>
      <section class="w-full h-full flex flex-col max-w-[80%] mx-auto py-6 gap-10">
        <h2 class="text-2xl font-semibold font-[Inter]">Comentários ({{ comments.length }})</h2>
        <CommentLoading v-if="loadingComments" v-for="item in 4" :key="item" />
        <CreateComment 
          v-if="!loadingComments" 
          v-model="myComment" 
          :profile-pic="user.avatarUrl" 
          :loading="false" 
          @submit-comment="handleCreateComment" 
        />
        <Comment
          v-if="!loadingComments"
          v-for="comment in comments" 
          :key="comment.id"
          :description="comment.description"
          :profile="comment.profile"
          :created-at="comment.createdAt"
          :id="comment.id"
          :is-author="comment.profile.id === user.id"
          @delete="handleDeleteComment"
        ></Comment>
      </section>
    </article>
  </div>
</template>

<script setup lang="ts">
import Stat from '@/modules/posts/components/Stat.vue'
import Comment from '@/modules/posts/components/Comment.vue'
import PostDetailLoading from '@/modules/posts/components/PostDetailLoading.vue'
import CommentLoading from '@/modules/posts/components/CommentLoading.vue'
import { useMyself } from '@/modules/users/composables/useMyself/useMyself'

import { onMounted } from 'vue'
import type { CommentType, PostDetail } from '@/types'

const services = useServices()
const { user } = useMyself()
const toast = useToast()

const post = reactive<PostDetail>({
  id: '',
  title: '',
  description: null,
  coverImageUrl: '',
  code: '',
  createdAt: new Date(),
  isDraft: false,
  totalLikes: 0,
  totalComments: 0,
  profile: {}
})

const myComment = ref<string>('')
const comments = reactive<CommentType[]>([])
const loading = ref(true)
const loadingComments = ref(false)
const loadingCreateComment = ref(false)

const isAuthorPost = computed(() => post?.profile?.id === user.value?.id)

const route = useRoute()

const {data: postServer, pending} = await useAsyncData('post-details', () => {
  const { username, code } = route.params as {username: string, code: string}
  return services.post.getPostByCode({username, code})
})

const getPost = async () => {
  const { username, code } = route.params as {username: string, code: string}

  try {
    loading.value = true

    const data = await services.post.getPostByCode({username, code})
    Object.assign(post, data)

    await sleep(1000)

    getComments(data.id)

    loading.value = false
  } catch (error) {
    loading.value = false    
  }
}

const getComments = async (postId: string) => {
  if (!postId) return
  try {
    loadingComments.value = true

    const data = await services.post.getAllComments(postId)
    comments.splice(0, comments.length, ...data)

    loadingComments.value = false
  } catch (error) {
    loadingComments.value = false
  }
}

const handleCreateComment = async () => {
  try {
    loadingCreateComment.value = true
    
    await services.post.createComment({description: myComment.value, postId: post.id})
    myComment.value = ''
    getComments(post.id)
    
    loadingCreateComment.value = false
  } catch (error) {
    loadingCreateComment.value = false
  }
}

const handleDeleteComment = async (id: string) => {
  try {
    await services.post.deleteComment(id)
    toast.add({
      severity: 'success',
      summary: 'Sucesso!',
      detail: 'Comentário deletado com sucesso!',
      life: 2000
    })
    getComments(post.id)
  } catch (error) {
    console.log(error);
  }
}

const navigateToEdit = () => {
  if (!post.id) return
  navigateTo(`/posts/edit/${post.id}`)
}

useSeoMeta({
  title: `${postServer.value?.title} by ${postServer.value?.profile?.username}`,
  ogTitle: `${postServer.value?.title} by ${postServer.value?.profile?.username}`,
  description: `Veja o post de ${postServer.value?.profile?.username} no NossaComuna`,
  ogDescription: `Veja o post de ${postServer.value?.profile?.username} no NossaComuna`,
})

onMounted(() => getPost())
</script>

<style lang="scss">
.editor-post {
  @apply p-2 md:p-0;

  div.ce-block__content {
    @apply mx-0 my-0;
  }

}
</style>