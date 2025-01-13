import axios from "axios";
import { useAuthentication } from "@/modules/auth/composables/useAuthentication/useAuthentication";
import { useMyself } from '@/modules/users/composables/useMyself/useMyself'


// const config = useRuntimeConfig()
// const { token } = useAuthentication()

// axios.interceptors.request.use((config) => {
//   console.log('interceptor', token.value);
//   if (token.value) {
//     config.headers.Authorization = `Bearer ${token.value}`;
//   }
//   return config
// })

// export const httpClient = axios.create({
//   baseURL: `${''}/api/v1`
// })

export default defineNuxtPlugin(nuxtApp => {

  const { token } = useAuthentication()
  const { logout } = useMyself()


  const httpClient = axios.create({
    baseURL: nuxtApp.$config.public.apiUrl,
  })

  httpClient.interceptors.request.use((config) => {
    if (token.value) {
      config.headers.Authorization = token.value
    }
    return config
  }, (error) => {
    return Promise.reject(error)
  })

  httpClient.interceptors.response.use((response) => {
    if (response.data?.accessToken) {
      token.value = response.data?.accessToken
    }
    return response
  }, (error) => {

    if (error.status === 401) logout()
    
    return Promise.reject(error)
  })
  
  return {
    provide: {
      httpClient
    },
  }
})