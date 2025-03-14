import type { CommentType, PostDetail } from "@/types/index"
import { myselfKey, type MyselfContextProvider } from '@/modules/users/composables/useMyself/useMyself'
import type { ICommentPost, ILikeCommentProps } from "../../types/post"

export function useComment(post: Ref<PostDetail>) {

  const { user } = inject(myselfKey) as MyselfContextProvider

  const services = useServices()
  const loading = ref<boolean>(false)
  const comments = reactive<ICommentPost[]>([])
  const toast = useToast()
  const myComment = ref<string>('')


  const getComments = async () => {
    if (!post.value?.id) return
    try {
      loading.value = true
  
      const data = await services.post.getAllComments({postId: post.value.id})

      const result = []
      data?.forEach((el: ICommentPost) => {
        const parent = data.find((parent: ICommentPost) => parent.id === el.commentId)
        if (parent && !parent?.comments) parent.comments = []
        if (parent) parent.comments.push(el)
        else result.push(el)
      })

      Object.assign(comments, result)
  
      loading.value = false
    } catch (error) {
      loading.value = false
    }
  }

  const createComment = async (content: string) => {
    try {
      loading.value = true
      
      await services.post.createComment({content, postId: post.value?.id, profileId: user.value.id})
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
      
      await services.post.createComment({content: comment, postId: post.value.id, commentId, profileId: user.value.id})
      getComments()
      
      loading.value = false
    } catch (error) {
      loading.value = false
    }
  }

  const likeComment = async ({commentId, postId}: ILikeCommentProps) => {
    try {
      const comment = findComment(comments, commentId)

      await services.post.like({commentId, profileId: user.value.id, postId})
  
      comment.liked = true
      comment.likes += 1 
    } catch (error) {
      console.log(error);
    }
  }
  
  const deslikeComment = async ({commentId, postId}: ILikeCommentProps) => {
    try {
      const comment = findComment(comments, commentId)

      await services.post.deslike({commentId, profileId: user.value.id, postId})
  
      comment.liked = false
      comment.likes -= 1
    } catch (error) {
      console.log(error);
    }
  }

  const findComment = (arrTree: any[], id: string): CommentType => {
    let elementFound = arrTree.find(el => el.id === id)
    if (elementFound) return elementFound 
    else {
      arrTree?.forEach(row => {
        if (row.comments.length > 0 && !elementFound) elementFound = findComment(row.comments, id)
      })
    }
    return elementFound
  }

  onUnmounted(() => {
    Object.assign(comments, [])
  })

  onMounted(() => {
    getComments()
  })

  return {
    loading,
    comments,
    myComment,
    getComments,
    createComment,
    deleteComment,
    onReply,
    likeComment,
    deslikeComment
  }
}