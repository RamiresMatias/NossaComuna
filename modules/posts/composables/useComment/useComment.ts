import type { CommentType, PostDetail } from "@/types/index"
import { myselfKey, type MyselfContextProvider } from '@/modules/users/composables/useMyself/useMyself'

export function useComment(post: Ref<PostDetail>) {

  const { user } = inject(myselfKey) as MyselfContextProvider

  const services = useServices()
  const loading = ref<boolean>(false)
  const comments = reactive<CommentType[]>([])
  const toast = useToast()
  const myComment = ref<string>('')


  const getComments = async () => {
    if (!post.value?.id) return
    try {
      loading.value = true
  
      const data = await services.post.getAllComments({postId: post.value.id})

      const result = []
      data.forEach((el: CommentType) => {
        const parent = data.find((parent: CommentType) => parent.id === el.commentId)
        if (parent) parent.comments.push(el)
        else result.push(el)
      })
      Object.assign(comments, result)
  
      loading.value = false
    } catch (error) {
      loading.value = false
    }
  }

  const createComment = async (description: string) => {
    try {
      loading.value = true
      
      // await services.post.createComment({description, postId: post.value?.id})
      getComments()
      myComment.value = ''
      
      loading.value = false
    } catch (error) {
      loading.value = false
    }
  }

  const deleteComment = async (id: string) => {
    try {
      loading.value = true

      // await services.post.deleteComment(id)
      toast.add({
        severity: 'success',
        summary: 'Sucesso!',
        detail: 'Comentário deletado com sucesso!',
        life: 2000
      })
      getComments()

      loading.value = false
    } catch (error) {
      console.log(error);
      loading.value = false
    }
  }

  const onReply = async ({comment, commentId}: {comment: string, commentId: string}) => {
    try {
      loading.value = true
      
      // await services.post.replyComment({description: comment, postId: post.value.id, commentId, userId: user.value.id})
      getComments()
      
      loading.value = false
    } catch (error) {
      loading.value = false
    }
  }

  onUnmounted(() => {
    Object.assign(comments, [])
  })

  watchEffect(() => {
    if (post.value?.id) getComments()
  })

  return {
    loading,
    comments,
    myComment,
    getComments,
    createComment,
    deleteComment,
    onReply,
  }
}