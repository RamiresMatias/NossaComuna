import type { CommentType, PostDetail } from "@/types/index"
import { myselfKey, type MyselfContextProvider } from '@/modules/users/composables/useMyself/useMyself'

export function useComment(post: PostDetail) {

  const { user } = inject(myselfKey) as MyselfContextProvider

  const services = useServices()
  const loading = ref<boolean>(false)
  const comments = reactive<CommentType[]>([])
  const toast = useToast()


  const getComments = async () => {
    if (!post.id) return
    try {
      loading.value = true
  
      const data = await services.post.getAllComments({postId: post.id, userId: user.value.id})
      const result = []
      data.forEach((el: CommentType, _, self) => {
        const parent = data.find((parent: CommentType) => parent.id === el.commentId)
        if (parent) parent.comments.push(el)
        else result.push(el)
      })
      comments.splice(0, comments.length, ...result)
  
      loading.value = false
    } catch (error) {
      loading.value = false
    }
  }

  const createComment = async (description: string) => {
    try {
      loading.value = true
      
      await services.post.createComment({description, postId: post.id})
      getComments()
      
      loading.value = false
    } catch (error) {
      loading.value = false
    }
  }

  const deleteComment = async (id: string) => {
    try {
      loading.value = true

      await services.post.deleteComment(id)
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
      
      await services.post.replyComment({description: comment, postId: post.id, commentId, userId: user.value.id})
      getComments()
      
      loading.value = false
    } catch (error) {
      loading.value = false
    }
  }

  watchEffect(() => {
    if (post.id) getComments()
  })

  return {
    loading,
    comments,
    getComments,
    createComment,
    deleteComment,
    onReply
  }
}