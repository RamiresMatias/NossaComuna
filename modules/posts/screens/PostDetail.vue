<template>
  <PostDetailLoading v-if="isBusy || !currentPost?.id" />
  <div v-else class="grid grid-cols-12 w-full max-w-[1380px] px-4 lg:px-0 gap-y-6">
    <div v-if="!isBusy" class="col-span-0.5 hidden lg:flex flex-col items-end m-0 p-0 gap-4">
      <Button
        v-if="isAuthor" 
        icon="pi pi-pencil" 
        severity="contrast" 
        text 
        rounded 
        aria-label="Editar" 
        v-tooltip="{ value: 'Editar post', showDelay: 300, hideDelay: 300 }"
        class="text-base text-surface-500"
        @click="navigateToEdit"
      />
      <div v-if="user?.id" class="flex flex-col items-center">
        <Button 
          :icon="post.liked ? 'pi pi-heart-fill' : 'pi pi-heart'" 
          severity="contrast" 
          text 
          rounded 
          aria-label="Curtir post" 
          v-tooltip="{ value: 'Curtir post', showDelay: 300, hideDelay: 300 }"
          class="text-base text-surface-500"
          @click="post.liked ? deslikePost() : likePost()"
        />
        <span class="text-sm text-neutral-500">{{ post.likes }}</span>
      </div>
      <div v-if="user?.id" class="flex flex-col items-center">
        <Button
          icon="pi pi-comments" 
          severity="contrast" 
          text
          rounded
          aria-label="Comentários"
          v-tooltip="{ value: 'Comentários', showDelay: 300, hideDelay: 300 }"
          class="text-base text-surface-500"
          @click="() => {}"
        />
        <span class="text-sm text-neutral-500">{{ comments.length }}</span>
      </div>
    </div>
    <section class="w-full h-full mx-auto bg-white rounded-md flex flex-col col-span-full lg:col-span-8 shadow-sm">
      <NuxtImg 
        v-if="post.coverImageUrl"
        :src="post.coverImageUrl"
        alt="Capa do post"
        class="object-cover rounded-t-md mb-8 h-[380px] w-full"
        loading="lazy"
        height="380px"
        width="920px"
        decoding="auto"
        format="webp"
        preload
      >
      </NuxtImg>
      <section class="w-full h-full flex flex-col max-w-[880px] px-4 mx-auto" :class="{'mt-8': !post.coverImageUrl}">
        <NuxtLink class="flex w-full gap-2 flex-col min-[300px]:flex-row" :to="`/${post.profile.username}`">
          <NuxtImg 
            :src="post.profile.avatarUrl"
            alt="Avatar do author"
            class="w-full h-full max-h-[48px] max-w-[48px] object-cover rounded-full"
            loading="lazy"
            decoding="auto"
          />
          <div class="w-full h-full flex flex-col flex-1 gap-1">
            <p class=" text-base text-surface-800 text-balance">
              {{ post.profile.username }}
            </p>
            <p class="text-xs  text-gray-500">
              Postado em {{ post.createdAt }}
            </p>
          </div>
        </NuxtLink>
        <div class="my-4 flex items-center gap-2 flex-wrap">
          <Tag 
            v-for="tag in post.tags" 
            :key="tag.id" 
            class="flex gap-2 font-light items-center bg-primary-50" 
            severity="secondary"
          >
            <span class="text-surface-900 text-xs">{{ tag.description }}</span>
          </Tag>
        </div>
        <div class="w-full flex gap-4 mb-4">
          <Stat :count="post.likes" class="text-lg text-surface-500">
            <template #preffix>
              <i class="pi pi-heart-fill text-lg"></i>
            </template>
          </Stat>
          <Stat :count="comments.length" class="text-lg text-surface-500">
            <template #preffix>
              <i class="pi pi-comments text-lg"></i>
            </template>
          </Stat>
        </div>
        <h1 class="text-3xl font-bold text-pretty tracking-wide mb-6">
          {{ post.title }}
        </h1>
        <TiptapEditor ref="tiptapRef" v-model="post.content" readonly class="text-xs"></TiptapEditor>
      </section>
      <div class="w-full h-[2px] bg-gray-200 mt-6"></div>
      <section id="comments" class="w-full h-full flex flex-col max-w-[880px] px-4 mx-auto py-6 gap-10">
        <h2 class="text-lg font-semibold">Comentários ({{ comments.length }})</h2>
        <CommentLoading v-if="loadingUser" />
        <CommentLoading v-if="loadingComments" v-for="item in 4" :key="item" />
        <CreateComment 
          v-if="user?.id" 
          v-model="myComment" 
          :profile-pic="user?.avatarUrl" 
          :loading="loadingComments" 
          @submit-comment="() => createComment(myComment)" 
        />
        <Comment
          v-if="!loadingComments"
          v-for="comment in comments" 
          :key="comment.id"
          :content="comment.content"
          :username="comment.username"
          :email="comment.email"
          :avatar-url="comment.avatarUrl"
          :created-at="comment.createdAt"
          :id="comment.id"
          :is-author="comment.profileId === user?.id"
          :comments="comment.comments"
          :liked="comment.liked"
          :likes="comment.likes"
          @delete="(id) => deleteComment(id)"
          @on-reply="({comment, commentId}) => onReply({comment, commentId})"
          @on-like="(commentId: string) => likeComment({commentId, postId: post.id})"
          @on-deslike="(commentId: string) => deslikeComment({commentId, postId: post.id})"
        ></Comment>
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
const Stat = resolveComponent('Stat')
const Comment = resolveComponent('Comment')
const PostDetailLoading = resolveComponent('PostDetailLoading')
const CommentLoading = resolveComponent('CommentLoading')

import { useComment } from '@/modules/posts/composables/useComment/useComment'
import { useLike } from '@/modules/posts/composables/useLike/useLike'
import { usePostDetail } from '@/modules/posts/composables/usePostDetail/usePostDetail'

import { myselfKey, type MyselfContextProvider } from '@/modules/users/composables/useMyself/useMyself'

const { user, loading: loadingUser } = inject(myselfKey) as MyselfContextProvider

const route = useRoute()

const services = useServices()

const { data, status } = await useLazyAsyncData('post-details', () => {
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
  onReply,
  likeComment,
  deslikeComment
} = useComment(post)

const { likePost, deslikePost } = useLike(post)
const { isAuthor } = usePostDetail(post)


const isBusy = computed(() => status.value === 'pending')
const currentPost = computed(() => post.value)

const navigateToEdit = () => {
  if (!post.value?.id) return
  navigateTo(`/posts/edit/${post.value.id}`)
}

useHead({
  title: () => `${data.value?.title} por ${data.value?.profile?.username}`,
  meta: [
    { name: 'description', content: `Veja o post de ${data.value?.profile?.username} no NossaComuna` }
  ]
})

useServerSeoMeta({
  ogTitle: () => `${data.value?.title} por ${data.value?.profile?.username}`,
  title: () => `${data.value?.title} por ${data.value?.profile?.username}`,
  description: () => `Veja o post de ${data.value?.profile?.username} no NossaComuna`,
  ogDescription: () => `Veja o post de ${data.value?.profile?.username} no NossaComuna`,
  ogImage: () => data.value?.coverImageUrl,
  ogImageUrl: () => data.value?.coverImageUrl,
  twitterCard: () => 'summary_large_image',
  twitterTitle: () => `${data.value?.title} por ${data.value?.profile?.username}`,
  twitterDescription: () => `Veja o post de ${data.value?.profile?.username} no NossaComuna`,
  twitterImage: () => data.value?.coverImageUrl,
})

</script>

<style lang="scss" scoped>
.editor-post {
  @apply p-2 md:p-0;

  div.ce-block__content {
    @apply mx-0 my-0;
  }

}
</style>