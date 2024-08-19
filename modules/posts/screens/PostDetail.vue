<template>
  <PostDetailLoading v-if="isBusy || !currentPost?.id" />
  <div v-else class="grid grid-cols-12 w-full max-w-[1380px] px-4 lg:px-0 gap-y-6">
    <div v-if="!pending" class="col-span-0.5 hidden lg:flex flex-col items-center m-0 p-0 gap-4">
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
    <article class="w-full h-full mx-auto bg-white rounded-md flex flex-col col-span-full lg:col-span-8 shadow-sm">
      <NuxtImg 
        v-if="post.coverImageUrl"
        :src="post.coverImageUrl + '?c=' + new Date()"
        alt="Imagem de capa do post"
        class="w-full h-full max-h-[400px] object-cover rounded-t-md mb-8"
        loading="lazy"
        decoding="auto"
      />
      <section class="w-full h-full flex flex-col max-w-[880px] px-4 mx-auto" :class="{'mt-8': !post.coverImageUrl}">
        <div class="flex w-full gap-2 flex-col min-[300px]:flex-row">
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
          <Stat :count="post.likes" class="text-lg text-primary-400">
            <template #preffix>
              <i class="pi pi-heart-fill text-lg"></i>
            </template>
          </Stat>
          <Stat :count="comments.length" class="text-lg text-primary-400">
            <template #preffix>
              <i class="pi pi-comments text-lg"></i>
            </template>
          </Stat>
        </div>
        <div class="mb-4 flex items-center gap-2 flex-wrap">
          <Tag 
            v-for="tag in postTags" 
            :key="tag.id" 
            class="flex gap-2 items-center bg-neutral-100" 
            severity="secondary"
          >
            <span class="text-gray-600 text-sm">{{ tag.description }}</span>
          </Tag>
        </div>
        <h1 class="text-5xl font-bold text-pretty tracking-wide mb-6">
          {{ post.title }}
        </h1>
        <TiptapEditor ref="tiptapRef" v-model="post.description" readonly></TiptapEditor>
      </section>
      <div class="w-full h-[2px] bg-gray-200 mt-6"></div>
      <section class="w-full h-full flex flex-col max-w-[880px] px-4 mx-auto py-6 gap-10">
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
    <section class="col-span-full lg:col-span-3 lg:ml-4">
      <AuthorProfileLoading v-if="isBusy || loadingProfile" />
      <AuthorProfile
        v-else 
        :id="author.id"
        :username="author.username"
        :avatar-url="author.avatarUrl"
        :bio="author.bio"
        :created-at="author.createdAt"
        :email="author.email"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import Stat from '@/modules/posts/components/Stat.vue'
import Comment from '@/modules/posts/components/Comment.vue'
import PostDetailLoading from '@/modules/posts/components/PostDetailLoading.vue'
import CommentLoading from '@/modules/posts/components/CommentLoading.vue'
import AuthorProfile from '@/modules/posts/components/AuthorProfile.vue'
import AuthorProfileLoading from '@/modules/posts/components/AuthorProfileLoading.vue'

import { useComment } from '@/modules/posts/composables/useComment/useComment'
import { useAuthor } from '@/modules/posts/composables/useAuthor/useAuthor'
import { useLike } from '@/modules/posts/composables/useLike/useLike'

import { myselfKey, type MyselfContextProvider } from '@/modules/users/composables/useMyself/useMyself'
import { usePostTag } from '@/modules/tag/composables/usePostTag/usePostTag'

const { user } = inject(myselfKey) as MyselfContextProvider

const route = useRoute()

const services = useServices()

const { pending, data } = await useLazyAsyncData('post-details', () => {
  const { username, code } = route.params as {username: string, code: string}
  return services.post.getPostByCode({username, code})
})

const post = computed(() => data.value)

const { 
  comments, 
  loading: loadingComments,
  myComment,
  createComment,
  deleteComment,
  onReply
} = useComment(post.value)

const { author, loading: loadingProfile } = useAuthor(post)

const { likePost, deslikePost, likeComment } = useLike(post)

const { getTagsFromPost, postTags } = usePostTag()

watch(data, (newPost, oldPost) => {
  if (newPost?.id && !oldPost) getTagsFromPost(newPost.id)
}, {
  immediate: true
})

const isAuthorPost = computed(() => post.value?.profile?.id === user.value?.id)
const isBusy = computed(() => pending.value)
const currentPost = computed(() => post.value)

const navigateToEdit = () => {
  if (!post.value?.id) return
  navigateTo(`/posts/edit/${post.value.id}`)
}

useSeoMeta({
  title: () => `${post.value?.title} by ${post.value?.profile?.username}`,
  ogTitle: () => `${post.value?.title} by ${post.value?.profile?.username}`,
  description: () => `Veja o post de ${post.value?.profile?.username} no NossaComuna`,
  ogDescription: () => `Veja o post de ${post.value?.profile?.username} no NossaComuna`,
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