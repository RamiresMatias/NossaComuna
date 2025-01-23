<template>
  <PostDetailLoading v-if="isBusy || !currentPost?.id" />
  <div v-else class="grid grid-cols-12 w-full max-w-[1380px] px-4 lg:px-0 gap-y-6">
    <section v-if="!isBusy" class="col-span-0.5 hidden lg:flex flex-col items-center m-0 p-0 gap-4">
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
        v-if="!isAuthorPost && user?.id"
        :icon="post.liked ? 'pi pi-heart-fill' : 'pi pi-heart'" 
        severity="contrast" 
        text 
        rounded 
        aria-label="Editar" 
        v-tooltip="{ value: 'Curtir post', showDelay: 300, hideDelay: 300 }"
        class="text-xl text-primary-300"
        @click="post.liked ? deslikePost() : likePost()"
      />
    </section>
    <section class="w-full h-full mx-auto bg-white rounded-md flex flex-col col-span-full lg:col-span-8 shadow-sm">
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
          <Avatar :image="post.profile.avatarUrl" shape="circle" size="large" alt="Avatar do autor do perfil" />
          <div class="w-full h-full flex flex-col flex-1 gap-1">
            <p class=" text-base lg:text-lg text-[--title-color] font-bold text-balance">
              {{ post.profile.username }}
            </p>
            <p class="text-xs font-regular text-gray-500">
              Postado em {{ new Date(post.createdAt).toLocaleDateString('pt-br') }}
            </p>
          </div>
        </div>
        <div class="w-full flex gap-4 my-4">
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
            v-for="tag in post.tags" 
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
        <TiptapEditor ref="tiptapRef" v-model="post.content" readonly></TiptapEditor>
      </section>
      <div class="w-full h-[2px] bg-gray-200 mt-6"></div>
      <section class="w-full h-full flex flex-col max-w-[880px] px-4 mx-auto py-6 gap-10">
        <h2 class="text-2xl font-semibold">Comentários ({{ comments.length }})</h2>
        <CommentLoading v-if="loadingComments" v-for="item in 4" :key="item" />
        <CreateComment 
          v-if="!loadingComments && user?.id" 
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
    <section class="col-span-full lg:col-span-3 lg:ml-4">
      <AuthorProfileLoading v-if="isBusy && !post.profile.id" />
      <AuthorProfile
        v-else 
        :id="post.profile.id"
        :username="post.profile.username"
        :avatar-url="post.profile.avatarUrl"
        :bio="post.profile.bio"
        :created-at="post.profile.createdAt"
        :email="post.profile?.user?.email"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
const Stat = resolveComponent('Stat')
const Comment = resolveComponent('Comment')
const PostDetailLoading = resolveComponent('PostDetailLoading')
const CommentLoading = resolveComponent('CommentLoading')
const AuthorProfile = resolveComponent('AuthorProfile')
const AuthorProfileLoading = resolveComponent('AuthorProfileLoading')

import { useComment } from '@/modules/posts/composables/useComment/useComment'
import { useLike } from '@/modules/posts/composables/useLike/useLike'

import { myselfKey, type MyselfContextProvider } from '@/modules/users/composables/useMyself/useMyself'

const { user } = inject(myselfKey) as MyselfContextProvider

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


const isAuthorPost = computed(() => post.value?.profile?.id === user.value?.id)
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