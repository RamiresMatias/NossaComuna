import type { Tag } from "~/types"

export function useTag() {

  const services = useServices()
  const loading = ref<boolean>(false)
  const search = ref('')
  const postTags = ref<Tag[]>([])

  const list = ref<Tag[]>([])

  const filteredList = computed(() => {
    return list.value.filter(el => el.description.toLowerCase().includes(search.value.toLowerCase()))
  })
 
  const getTags = async () => {
    try {
      loading.value = true
      
      const data = await services.tag.getTags()
      list.value = data
      
      loading.value = false
    } catch (error) {
      loading.value = false
    }
  }

  const create = async (description: string) => {
    try {
      loading.value = true
      
      const data = await services.tag.create(description)
      list.value.push(data)
      
      loading.value = false

      return data
    } catch (error) {
      loading.value = false
    }
  }

  onMounted(() => {
    !list.value.length && getTags()
  })


  return {
    loading,
    list,
    filteredList,
    search,
    postTags,
    getTags,
    create
  }
}