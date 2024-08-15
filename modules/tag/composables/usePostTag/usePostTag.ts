import type { BindTagProps, Tag } from "~/types"

export function usePostTag() {

  const services = useServices()
  const loading = ref<boolean>(false)
  const postTags = ref<Tag[]>([])

  const getTagsFromPost = async () => {
    try {
      loading.value = true
      
      loading.value = false
    } catch (error) {
      loading.value = false
      console.log(error);
    }
  }

  const bindTagsInPost = async ({postId, tags}: BindTagProps) => {
    try {
      loading.value = true

      const success = await services.tag.removeBindTagsFromPost(postId) 
      if (success) await services.tag.bindTags({postId, tags})

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