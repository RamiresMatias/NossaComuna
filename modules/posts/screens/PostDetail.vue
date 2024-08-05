<template>
  <div class="grid grid-cols-12 w-full max-w-[1380px] px-4 lg:px-0 gap-y-6">
    <div v-if="!loading" class="col-span-1 hidden lg:flex flex-col items-center m-0 p-0 gap-4">
      <Button
        v-if="isAuthorPost" 
        icon="pi pi-pencil" 
        severity="contrast" 
        text 
        rounded 
        aria-label="Editar" 
        v-tooltip="{ value: 'Editar post', showDelay: 300, hideDelay: 300 }"
        class="text-xl"
        @click="navigateToEdit"
      />
      <Button 
        v-if="!isAuthorPost"
        :icon="post.liked ? 'pi pi-heart-fill' : 'pi pi-heart'" 
        severity="contrast" 
        text 
        rounded 
        aria-label="Editar" 
        v-tooltip="{ value: 'Curtir post', showDelay: 300, hideDelay: 300 }"
        class="text-xl text-primary-300"
        @click="post.liked ? deslikePost() : likePost()"
      />
    </div>
    <PostDetailLoading v-if="loading || pending" class="col-span-8" />
    <article v-else class="w-full h-full mx-auto bg-white rounded-md flex flex-col col-span-full lg:col-span-8 shadow-sm">
      <img v-if="post.coverImageUrl" :src="post.coverImageUrl + '?c='" alt="Imagem de capa do post" class="w-full h-full max-h-[400px] object-cover rounded-t-md mb-8" />
      <section class="w-full h-full flex flex-col max-w-[80%] mx-auto" :class="{'mt-8': !post.coverImageUrl}">
        <div class="flex w-full py-4 gap-2">
          <Avatar :image="post.profile.avatarUrl" shape="circle" size="large" />
          <div class="w-full h-full flex flex-col flex-1 gap-1">
            <p class=" text-base lg:text-lg text-[--title-color] font-bold text-balance">
              {{ post.profile.username }}
            </p>
            <p class="text-xs font-regular text-gray-500">
              Postado em {{ new Date(post.createdAt).toLocaleDateString('pt-br') }}
            </p>
          </div>
        </div>
        <div class="w-full flex gap-4 mb-10 mt-4">
          <Stat :count="post.likes" class="text-lg">
            <template #icon>
              <i class="pi pi-heart-fill text-lg"></i>
            </template>
          </Stat>
          <Stat :count="comments.length" class="text-lg">
            <template #icon>
              <i class="pi pi-comments text-lg"></i>
            </template>
          </Stat>
        </div>
        <h1 class="text-4xl font-bold text-pretty tracking-wide mb-6">
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
        <h2 class="text-2xl font-semibold">Comentários ({{ comments.length }})</h2>
        <CommentLoading v-if="loadingComments" v-for="item in 4" :key="item" />
        <CreateComment 
          v-if="!loadingComments" 
          v-model="myComment" 
          :profile-pic="user?.avatarUrl" 
          :loading="loadingComments" 
          @submit-comment="() => createComment(myComment)" 
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
          :comments="comment.comments"
          :liked="comment.liked"
          :likes="comment.likes"
          @delete="(id) => deleteComment(id)"
          @on-reply="({comment, commentId}) => onReply({comment, commentId})"
          @on-like="(commentId) => likeComment({comments, commentId})"
        ></Comment>
      </section>
    </article>
    <div class="col-span-full lg:col-span-3 lg:ml-4">
      <AuthorProfileLoading v-if="loadingProfile" />
      <AuthorProfile
        v-else 
        :id="author.id"
        :username="author.username"
        :avatar-url="author.avatarUrl"
        :bio="author.bio"
        :created-at="author.createdAt"
        :email="author.email"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Stat from '@/modules/posts/components/Stat.vue'
import Comment from '@/modules/posts/components/Comment.vue'
import PostDetailLoading from '@/modules/posts/components/PostDetailLoading.vue'
import CommentLoading from '@/modules/posts/components/CommentLoading.vue'
import AuthorProfile from '@/modules/posts/components/AuthorProfile.vue'
import AuthorProfileLoading from '@/modules/posts/components/AuthorProfileLoading.vue'

import { usePostDetail } from '@/modules/posts/composables/usePostDetail/usePostDetail'
import { useComment } from '@/modules/posts/composables/useComment/useComment'
import { useAuthor } from '@/modules/posts/composables/useAuthor/useAuthor'
import { useLike } from '@/modules/posts/composables/useLike/useLike'

import { myselfKey, type MyselfContextProvider } from '@/modules/users/composables/useMyself/useMyself'

const { user } = inject(myselfKey) as MyselfContextProvider

const services = useServices()
const route = useRoute()

const { loading, post } = usePostDetail({
  username: (route.params.username as string),
  code: (route.params.code as string),
})

const { 
  comments, 
  loading: loadingComments, 
  createComment,
  deleteComment,
  onReply
} = useComment(post)

const { author, loading: loadingProfile } = useAuthor(post)

const { likePost, deslikePost, likeComment } = useLike(post)

const myComment = ref<string>('')

const isAuthorPost = computed(() => post?.profile?.id === user.value?.id)

const {data: postServer, pending} = await useAsyncData('post-details', () => {
  const { username, code } = route.params as {username: string, code: string}
  return services.post.getPostByCode({username, code})
})

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

</script>

<style lang="scss">
.editor-post {
  @apply p-2 md:p-0;

  div.ce-block__content {
    @apply mx-0 my-0;
  }

}
</style>