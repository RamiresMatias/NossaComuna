import path from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'slide-right', mode: 'out-in' },
    layoutTransition: { name: 'slide-right', mode: 'out-in' },
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-primevue',
    '@nuxtjs/google-fonts',
    '@nuxtjs/supabase',
    "@nuxt/image",
    '@nuxtjs/robots'
  ],

  css: ['primeicons/primeicons.css'],

  primevue: {
    options: { unstyled: true },
    importPT: {
      as: 'lara',
      from: path.resolve(__dirname, "./assets/presets/lara")
    }
  },

  vite: {
    optimizeDeps: {
      include: ["@editorjs/editorjs"],
    },
  },

  supabase: {
    redirect: false
  },

  imports: {
    dirs: [
      "./composables/useServices",
    ]
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.SITE_URL,
      nodeEnv: process.env.NODE_ENV,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY
    }
  },

  typescript: {
    strict: false
  },

  components: [
    { path: '@/modules/posts/components', pathPrefix: false },
    '~/components'
  ],

  compatibilityDate: '2024-08-17'
})