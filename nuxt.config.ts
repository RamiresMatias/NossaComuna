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
      htmlAttrs: {
        lang: 'pt-BR'
      },
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-primevue',
    '@nuxtjs/google-fonts',
    '@nuxtjs/supabase',
    '@nuxt/image',
    '@nuxtjs/critters',
    'nuxt-vitalizer',
    'nuxt-lazy-hydrate',
    'nuxt-purgecss',
    'nuxt-delay-hydration',
  ],

  css: ['primeicons/primeicons.css'],

  primevue: {
    options: { unstyled: true },
    importPT: {
      as: 'lara',
      from: path.resolve(__dirname, "./assets/presets/lara")
    }
  },

  nitro: {
    compressPublicAssets: true,
    // compressPublicAssets: {
    //   brotli: true,
    //   gzip: true
    // },
    minify: true,
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

  compatibilityDate: '2024-08-17',

  builder: 'vite',

  vite: {
    build: {
      chunkSizeWarningLimit: 1000,
      cssMinify: true,
      minify: true,
    }
  },

  experimental: {
    componentIslands: true,
  },
})