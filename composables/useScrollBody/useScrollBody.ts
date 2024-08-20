export function useScrollBody (element: Ref<HTMLElement>) {

  const scrollEnd = ref<boolean>(false)

  function onScrollEnd (event: any) {
    const el = event.target

    if (!el) return (scrollEnd.value = false)
    
    scrollEnd.value = el.offsetHeight + el.scrollTop >= el.scrollHeight
  }

  onUnmounted(() => {
    if (element.value) element.value.removeEventListener('scroll', onScrollEnd, false)
  })

  onMounted(() => {
    if (element.value) element.value.addEventListener('scroll', onScrollEnd, false)
  })

  return {
    scrollEnd
  }
}