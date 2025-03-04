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
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-primevue',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@nuxtjs/critters',
    'nuxt-vitalizer',
    'nuxt-lazy-hydrate',
    'nuxt-delay-hydration',
    'nuxt-mailer',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap'
  ],

  googleFonts: {
    families: {
      Poppins: [300, 400, 500, 600, 700]
    },
    preload: true,
    display: 'swap'
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },

  site: {
    indexable: true
  },

  robots: {
    UserAgent: '*',
    allow: [
      '/',
      '/posts',
      '/:username/:code'
    ],
    disallow: [
      '/profile/edit/:id',
      '/auth',
      '/create-account',
      '/forgot-password',
      '/confirm/:email'
    ],
  },

  css: ['primeicons/primeicons.css'],

  primevue: {
    options: { 
      unstyled: false,
    },
    importPT: {
      as: 'lara',
      from: path.resolve(__dirname, "./assets/presets/lara")
    },
  },

  nitro: {
    compressPublicAssets: {
      brotli: true,
      gzip: true
    },
    minify: true,
  },

  imports: {
    dirs: [
      "./composables/useServices",
    ]
  },

  runtimeConfig: {
    mailerUser: process.env.NUXT_MAILER_USER,
    mailerPass: process.env.NUXT_MAILER_PASS,
    mailerLog: process.env.NUXT_MAILER_LOG,
    mailerDriver: process.env.NUXT_MAILER_DRIVER,
    mailerHost: process.env.NUXT_MAILER_HOST,
    mailerPort: process.env.NUXT_MAILER_PORT,
    mailerSmtpTls: process.env.NUXT_MAILER_SMTP_TLS,
    mailerFromAddress: process.env.NUXT_MAILER_FROM_ADDRESS,
    mailerToAddress: process.env.NUXT_MAILER_TO_ADDRESS,    

    public: {
      siteUrl: process.env.SITE_URL,
      nodeEnv: process.env.NODE_ENV,
      apiUrl: process.env.API_URL
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
      rollupOptions: {
        output: {
          inlineDynamicImports: true
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    },
    server: {
      headers: {
        "cache-control": 'no-transform'
      }
    }
  },

  image: {
    provider: 'none'
  },

  sourcemap: {
    server: true,
    client: true
  },

  experimental: {
    componentIslands: true,
    renderJsonPayloads: false
  },

  /*routeRules: {
    '/posts': { prerender: true, isr: true },
    '/:username/:code': { prerender: true, isr: true },
    '/': { prerender: true, isr: true },
  },*/

  hooks: {
    'build:manifest': (manifest) => {
      const css = manifest['node_modules/nuxt/dist/app/entry.js']?.css

      if (css) {

        for (let i = css.length - 1; i >= 0; i--) {

          if (css[i].startsWith('entry')) css.splice(i, 1)
        }
      }
    },
  },

  plugins: [
    '~/plugins/axios/axios'
  ]
})