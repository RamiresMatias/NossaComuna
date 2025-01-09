export function useLocalStorage () {

  const setItem = (key: string, value: any) => {
    if (!window?.localStorage) return
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  const getItem = (key: string) => {
    if (!window?.localStorage) return
    return JSON.parse(window.localStorage.getItem(key))
  }

  const removeItem = (key: string) => {
    if (!window?.localStorage) return
    return window.localStorage.removeItem(key)
  }

  return {
    setItem,
    getItem,
    removeItem
  }
}