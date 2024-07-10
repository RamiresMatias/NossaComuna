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
          :loading="loadingCreateComment" 
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
          :comments="comment.comments"
          :liked="comment.liked"
          :likes="comment.likes"
          @delete="handleDeleteComment"
          @on-reply="handleOnReply"
          @on-like="likeComment"
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

import { myselfKey, type MyselfContextProvider } from '@/modules/users/composables/useMyself/useMyself'

const { user } = inject(myselfKey) as MyselfContextProvider

import { onMounted } from 'vue'
import type { CommentType, PostDetail, Profile } from '@/types'

const services = useServices()
const toast = useToast()

const post = reactive<PostDetail>({
  id: '',
  title: '',
  description: null,
  coverImageUrl: '',
  code: '',
  createdAt: new Date(),
  isDraft: false,
  likes: 0,
  profile: {},
  liked: false,
})

const author = reactive<Profile>({
  id: '',
  createdAt: null,
  email: '',
  avatarUrl: '',
  bio: '',
  username: ''
})

const myComment = ref<string>('')
const comments = reactive<CommentType[]>([])
const loading = ref(true)
const loadingComments = ref(false)
const loadingCreateComment = ref(false)
const loadingProfile = ref(true)

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

    await sleep(500)

    const data = await services.post.getRpcPostByCode({username, code, userId: user.value.id})

    Object.assign(post, data)

    getProfileAuthor()
    getComments(data.id)

    loading.value = false
  } catch (error) {
    loading.value = false    
  }
}

const getComments = async (postId: string | null) => {
  if (!postId) return
  try {
    loadingComments.value = true

    const data = await services.post.getAllComments({postId, userId: user.value.id})
    const result = []
    data.forEach((el, _, self) => {
      const parent = data.find(parent => parent.id === el.commentId)
      if (parent) parent.comments.push(el)
      else result.push(el)
    })
    comments.splice(0, comments.length, ...result)

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

const getProfileAuthor = async () => {
  if (!post?.profile?.id) return
  try {
    loadingProfile.value = true
    const data = await services.users.getUserById(post.profile.id)
    Object.assign(author, data)

    loadingProfile.value = false
  } catch (error) {
    loadingProfile.value = false
    console.log(error);
  }
}

const handleOnReply = async ({comment, commentId}: {comment: string, commentId: string}) => {
  try {
    loadingCreateComment.value = true
    
    await services.post.replyComment({description: comment, postId: post.id, commentId, userId: user.value.id})
    getComments(post.id)
    
    loadingCreateComment.value = false
  } catch (error) {
    loadingCreateComment.value = false
  }
}

const likePost = async () => {
  try {
    await services.post.like({postId: post.id, userId: user.value.id})

    post.liked = !post.liked
    post.likes += 1
  } catch (error) {
    console.log(error);
  }
}

const deslikePost = async () => {
  try {
    await services.post.deslikePost({postId: post.id, userId: user.value.id})

    post.liked = !post.liked
    post.likes -= 1
  } catch (error) {
    console.log(error);
  }
}

const likeComment = async (commentId: string) => {
  try {
    const comment = findComment(comments, commentId)
    comment.liked 
      ? await services.post.deslikeComment({commentId, userId: user.value.id})
      : await services.post.likeComment({commentId, userId: user.value.id})

    comment.liked = !comment.liked
    comment.likes = comment.liked ? (comment.likes + 1) : (comment.likes - 1) 
  } catch (error) {
    console.log(error);
  }
}

const findComment = (arrTree: any[], id: string): CommentType => {
  let elementFound = arrTree.find(el => el.id === id)
  if (elementFound) return elementFound 
  else {
    arrTree.forEach(row => {
      if (row.comments.length > 0 && !elementFound) elementFound = findComment(row.comments, id)
    })
  }
  return elementFound
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