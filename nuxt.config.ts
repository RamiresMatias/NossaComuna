import path from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss', 
    'nuxt-primevue', 
    '@nuxtjs/google-fonts', 
    '@nuxtjs/supabase',
  ],
  css: ['primeicons/primeicons.css'],
  primevue: {
    options: { unstyled: true },
    importPT: {
      as: 'lara',
      from: path.resolve(__dirname, "./assets/presets/lara")
    }
  },
  googleFonts: {
    base64: true,
    fontsDir: "assets/fonts",
    overwriting: true,
    families: {
      Inter: [300, 500, 800],
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
      // "./composables/useMarkdown", 
      "./composables/useServices",
      // "./composables/useLogger"
    ]
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.SITE_URL,
      nodeEnv: process.env.NODE_ENV,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY
    }
  }
})