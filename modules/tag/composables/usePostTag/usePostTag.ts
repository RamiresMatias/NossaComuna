import type { BindTagProps, Tag } from "~/types"

export function usePostTag() {

  const services = useServices()
  const loading = ref<boolean>(false)
  const postTags = ref<Tag[]>([])

  const getTagsFromPost = async (postId: string) => {
    try {
      loading.value = true

      const data = await services.tag.getPostTags(postId)
      postTags.value = data 

      loading.value = false
    } catch (error) {
      loading.value = false
      console.log(error);
    }
  }

  const bindTagsInPost = async ({postId, tags}: BindTagProps) => {
    try {
      loading.value = true

      await services.tag.removeBindTagsFromPost(postId)
      await services.tag.bindTags({postId, tags})

      loading.value = false
    } catch (error) {
      loading.value = false
      console.log(error);
    }
  }

  return {
    loading,
    postTags,
    getTagsFromPost,
    bindTagsInPost
  }
}