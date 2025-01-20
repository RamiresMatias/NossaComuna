import type { CommentType, PostDetail } from "@/types/index"
import { myselfKey, type MyselfContextProvider } from '@/modules/users/composables/useMyself/useMyself'
import type { ILikeCommentProps } from "../../types/post"

export function useLike(post: Ref<PostDetail>) {

  const { user } = inject(myselfKey) as MyselfContextProvider

  const services = useServices()
  const loading = ref<boolean>(false)

  const likePost = async () => {
    try {
      await services.post.like({
        postId: post.value.id, 
        profileId: user.value.id, 
        commentId: null
      })
  
      post.value.liked = !post.value.liked
      post.value.likes += 1
    } catch (error) {
      console.log(error);
    }
  }

  const deslikePost = async () => {
    try {
      await services.post.deslike({postId: post.value.id, profileId: user.value.id, commentId: null})
  
      post.value.liked = !post.value.liked
      post.value.likes -= 1
    } catch (error) {
      console.log(error);
    }
  }

  const likeComment = async ({comments, commentId, postId}: ILikeCommentProps) => {
    try {
      const comment = findComment(comments, commentId)
      comment.liked
        ? await services.post.deslike({commentId, profileId: user.value.id, postId})
        : await services.post.like({commentId, profileId: user.value.id, postId})
  
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
      arrTree?.forEach(row => {
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