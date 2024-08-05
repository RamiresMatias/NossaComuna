import type { CommentType, PostDetail } from "@/types/index"
import { myselfKey, type MyselfContextProvider } from '@/modules/users/composables/useMyself/useMyself'

export function useLike(post: PostDetail) {

  const { user } = inject(myselfKey) as MyselfContextProvider

  const services = useServices()
  const loading = ref<boolean>(false)

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

  const likeComment = async ({comments, commentId}: {comments: CommentType[], commentId: string}) => {
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
  

  return {
    loading,
    likePost,
    deslikePost,
    likeComment
  }
}